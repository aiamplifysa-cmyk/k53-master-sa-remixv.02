# Static resource files

Place exported resource files directly in this directory (`public/resources/`). The app serves them at `/resources/<filename>`.

The filenames used by the app are listed in `src/data/documents.json` and `src/data/reference-images.json`. Question illustrations are also resolved here by their original filename. Keep the original filenames when copying files from Lovable so the links resolve without further code changes.

PDFs and images in this directory are included in the production static build; PDFs up to the configured 5 MB service-worker precache limit are also cached for offline use. Larger PDFs remain available online as normal static files.
