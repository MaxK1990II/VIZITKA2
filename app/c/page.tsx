import Link from "next/link";

export default function QrHomeRedirect() {
  return (
    <main>
      <p>
        <Link href="/">kanochkinmm.ru</Link>
      </p>
      <script
        dangerouslySetInnerHTML={{ __html: "location.replace('/')" }}
      />
    </main>
  );
}
