import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="md:grid grid-cols-2">
        <div className="p-2 flex flex-col justify-center">
          <h1 className="text-7xl text-red-400 font-bold ">
            Miniso
          </h1>

          <p className="text-2xl text-justify text-red-600 p-1">
            Capture your ideas anytime.anywhere.
          </p>

          <p className="text-justify m-1">
           Miniso is a simple, user-friendly, and efficient note management application that helps users create, view, edit, and delete notes. It allows users to organize their thoughts, manage important information, and keep track of daily tasks in one place. With an intuitive interface and easy-to-use features, NoteApp makes managing notes quick and convenient anytime, anywhere.
          </p>

          <Link
            href={'/login'}
            className="p-3 bg-red-600 text-white rounded-2xl border shadow hover:bg-red-700 hover:shadow-lg  text-center mt-3"
          >
            Start Now {'->'}
          </Link>
        </div>

        <div>
          <Image
            src={'/landing.webp'}
            alt="landing_image"
            width={700}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}