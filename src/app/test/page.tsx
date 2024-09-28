import Link from "next/link";

 export default function Test () {
    return (
        <div>
            Test page
           <div>
                <div>
                <Link href="/">Перейти на главную страницу</Link>
                </div>
                <div>
                <Link href="/test/test2">Перейти на страницу <strong>Test 2</strong></Link>
                </div>
           </div>
        </div>
    )
}