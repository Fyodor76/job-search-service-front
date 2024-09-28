import Link from "next/link";

export default function Test2 () {
    return (
       <div>
         <div>Test 2</div>
         <div>
            <Link href="/test">Перейти обратно на страницу Test</Link>
         </div>
       </div>
    )
}