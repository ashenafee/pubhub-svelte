const BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const SEARCH_URL = `${BASE_URL}/esearch.fcgi`;
const SUMMARY_URL = `${BASE_URL}/esummary.fcgi`;


export async function searchPubMed(term: string) {
  const params = new URLSearchParams({
    db: 'pubmed',
    term: term,
    sort: 'relevance'
  });

  const url = `${SEARCH_URL}?${params}`;
  const response = await fetch(url);
  const xmlString = await response.text();
  
  // Parse the response
  const xml = parseXml(xmlString);
  const ids = Array.from(xml.getElementsByTagName('Id')).map(node => node.textContent).filter(id => id !== null) as string[];  
  
  // Fetch the summaries
  const articles = await fetchSummaries(ids);

  return articles;
}


function parseXml(xmlString: string) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, 'text/xml');
  return xml;
}


async function fetchSummaries(ids: string[]) {
  const params = new URLSearchParams({
    db: 'pubmed',
    id: ids.join(','),
    retmode: 'xml',
  });

  const url = `${SUMMARY_URL}?${params}`;
  const response = await fetch(url);
  const xmlString = await response.text();

  // Parse the response
  const xml = parseXml(xmlString);
  const articles = Array.from(xml.getElementsByTagName('DocSum')).map(node => {
    const pid = node.getElementsByTagName('Id')[0].textContent;
    const title = node.querySelector('Item[Name="Title"]');
    const authors = Array.from(node.getElementsByTagName('Item')).filter(node => node.getAttribute('Name') === 'Author').map(node => node.textContent);
    const journal = node.querySelector('Item[Name="FullJournalName"]');
    const date = node.querySelector('Item[Name="PubDate"]');
    const doi = node.querySelector('Item[Name="DOI"]');
    const issn = node.querySelector('Item[Name="ISSN"]');
    const eissn = node.querySelector('Item[Name="ESSN"]');
    
    const article = {
      id: pid ? pid : '',
      doi: doi ? doi.textContent : '',
      title: title ? title.textContent : '',
      authors: authors ? authors : [],
      journal: journal ? journal.textContent : '',
      date: date ? date.textContent : '',
      issn: issn ? issn.textContent : '',
      eissn: eissn ? eissn.textContent : '',
    };
    return article;
  });

  return articles;
}