import Link from "next/link";

export const metadata = { robots: { index: false, follow: true } };

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
