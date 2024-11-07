"use client";

import Link from "next/link";
import { FC } from "react";

interface ClientLinkProps {
  link: string;
}

const ClientLink: FC<ClientLinkProps> = ({ link }) => {
  return (
    <Link
      href={link}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        textDecoration: "none",
        color: "inherit",
      }}
    />
  );
};

export default ClientLink;
