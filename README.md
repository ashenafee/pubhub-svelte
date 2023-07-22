# PubHub

Get straight to the papers that matter.

## About

PubHub is a simple web application that allows users to query PubMed and sort the results by Journal Impact Factor (JIF).

## Installation

1. Clone the repository

```bash
git clone https://github.com/ashenafee/PubHub.git
```

2. Install dependencies

```bash
npm install
```

3. Start the server

```bash
npm run dev
```

4. Navigate to `localhost:4000` in your browser

## Usage

Using PubHub is simple. All you need to do is enter a search query and hit the search button. The results will be displayed, sorted by JIF.

You can click on these results to be directed to where their DOI is hosted.

## Contributing

Currently, the JIF data is from [Clarivate's 2022 Journal Citation Reports](https://jcr.clarivate.com/jcr/home). Since the entire list cannot be exported at once, only the top 2000 journals are included.

If you would like to add more JIF data, you can do so by modifying the `static/eissn.json` file. To access the data, you must have a Clarivate account and a subscription to the Journal Citation Reports.

Please ensure you make changes via a new branch and submit a pull request.

## License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)

## Acknowledgements

- [PubMed](https://pubmed.ncbi.nlm.nih.gov/)
- [Journal Citation Reports](https://jcr.clarivate.com/jcr/home)

