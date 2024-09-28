"use client"
import React, { useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import ImageModule from 'docxtemplater-image-module-free';
import { saveAs } from 'file-saver';
import styles from './ResumeGenerator.module.css';

interface Experience {
    company: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    description: string;
  }
  
  interface FormData {
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    experience: Experience[];
    photo: string | null;
  }

export default function ResumeGenerator() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    experience: [
      {
        company: '',
        jobTitle: '',
        startDate: '',  
        endDate: '',
        description: '',
      },
    ],
    photo: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newExperience = formData.experience.map((exp, expIndex) => {
      if (expIndex === index) {
        return { ...exp, [name]: value };
      }
      return exp;
    });
    setFormData((prev) => ({
      ...prev,
      experience: newExperience,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        const base64String = result.split(',')[1]; // Получаем Base64 строку изображения
        setFormData((prev) => ({
          ...prev,
          photo: base64String,
        }));
      }
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: '', jobTitle: '', startDate: '', endDate: '', description: '' },
      ],
    }));
  };

  const generateResume = async () => {
    try {
      const response = await fetch('/resume.docx'); // Загрузка шаблона
      const content = await response.arrayBuffer();
      const zip = new PizZip(content);
      const imageModule = new ImageModule({
        centered: false,
        getImage: (tagValue) => Buffer.from(tagValue, 'base64'),
        getSize: () => [150, 150],
      });

      const doc = new Docxtemplater(zip, {
        modules: [imageModule],
      });

      doc.setData(formData);

      doc.render();

      const blob = doc.getZip().generate({ type: 'blob' });
      saveAs(blob, 'resume_output.docx');
    } catch (error) {
      console.error('Error generating document:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Resume Generator</h1>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>First Name Test!</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Position:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className={styles.input}
          />
        </div>
        <h3 className={styles.experienceHeader}>Experience</h3>
        {formData.experience.map((exp, index) => (
          <div className={styles.experienceItem} key={index}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Company:</label>
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Job Title:</label>
              <input
                type="text"
                name="jobTitle"
                value={exp.jobTitle}
                onChange={(e) => handleExperienceChange(index, e)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Start Date:</label>
              <input
                type="text"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(index, e)}
                className={styles.input}
                placeholder="MM/YYYY"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>End Date:</label>
              <input
                type="text"
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(index, e)}
                className={styles.input}
                placeholder="MM/YYYY or Present"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Description:</label>
              <textarea
                name="description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, e)}
                className={styles.textarea}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className={`${styles.button} ${styles.addExperienceButton}`}
          onClick={addExperience}
        >
          Add Experience
        </button>
      </form>
      <button type="button" className={styles.button} onClick={generateResume}>
        Generate Resume
      </button>
    </div>
  );
}
