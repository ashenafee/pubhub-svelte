export interface PubmedResult {
    id: string;
    doi: string | null;
    title: string | null;
    authors: (string | null)[];
    journal: string | null;
    date: string | null;
    issn: string | null;
    eissn: string | null;
}