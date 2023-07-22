import type { PubmedResult } from '../types/pubmed';

interface JcrData {
  [key: string]: {
    jif2019: number;
    totalCites: number;
  };
}

export async function getJcrData(pubmedResults: PubmedResult[]): Promise<PubmedResult[]> {
  const response = await fetch('../eissn.json');
  const jcrData: JcrData = await response.json();

  const resultsWithJcrData = pubmedResults.map((result) => {
    const eissn = result.eissn;
    const issn = result.issn;

    let jcrDataForJournal = null;

    if (eissn) {
        const eissnKeys = Object.keys(jcrData).filter(key => key.startsWith(`${eissn},`));
        if (eissnKeys.length > 0) {
            const jcrDataKey = eissnKeys[0];
            jcrDataForJournal = jcrData[jcrDataKey];
        }
    }

    if (!jcrDataForJournal && issn) {
        const issnKeys = Object.keys(jcrData).filter(key => key.endsWith(`,${issn}`));
        if (issnKeys.length > 0) {
            const jcrDataKey = issnKeys[0];
            jcrDataForJournal = jcrData[jcrDataKey];
        }
    }

    return {
        ...result,
        jcrData: jcrDataForJournal,
    };
  });

  // Filter out results that don't have JCR data
  // TODO: Add more to the JCR data to avoid filtering many results
  const filtered = resultsWithJcrData.filter(result => result.jcrData !== null);

  // Sort by JIF
    filtered.sort((a, b) => {
        if (a.jcrData.jif2019 > b.jcrData.jif2019) {
            return -1;
        } else if (a.jcrData.jif2019 < b.jcrData.jif2019) {
            return 1;
        } else {
            return 0;
        }
    });

  return filtered;
}