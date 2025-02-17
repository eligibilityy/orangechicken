export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t bg-white dark:bg-black border-neutral-200 dark:border-neutral-800">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4">
          <h4 className="text-base md:text-lg leading-normal tracking-tight text-muted-foreground">
            Contact
          </h4>
          <a
            href="mailto:elijah_patrick_panique@dlsl.edu.ph"
            className="text-base md:text-lg leading-normal tracking-tight block hover:opacity-50 transition-opacity dark:text-neutral-300"
          >
            elijah_patrick_panique@dlsl.edu.ph
          </a>
        </div>
        <div className="space-y-4">
          <h4 className="text-base md:text-lg leading-normal tracking-tight text-muted-foreground">
            Social
          </h4>
          <div className="flex flex-col gap-2">
            <a
              href="https://github.com/eligibilityy"
              className="text-base md:text-lg leading-normal tracking-tight hover:opacity-50 transition-opacity dark:text-neutral-300"
            >
              GitHub
            </a>
            <a
              href="https://instagram.com/yiliya_liya"
              className="text-base md:text-lg leading-normal tracking-tight hover:opacity-50 transition-opacity dark:text-neutral-300"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@yiliyaliya"
              className="text-base md:text-lg leading-normal tracking-tight hover:opacity-50 transition-opacity dark:text-neutral-300"
            >
              Youtube
            </a>
            <a
              href="https://letterboxd.com/iyaiya"
              className="text-base md:text-lg leading-normal tracking-tight hover:opacity-50 transition-opacity dark:text-neutral-300"
            >
              Letterboxd
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <p className="swiss-text text-neutral-500 dark:text-neutral-400">
            © 2025 yiliya
          </p>
        </div>
      </div>
    </footer>
  );
}
