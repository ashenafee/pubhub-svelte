import json

with open('jcr.json') as f:
    data = json.load(f)

output = {}

for journal in data['data']:
    eissn = journal.get('eissn', '')
    if eissn == 'N/A':
        eissn = ''
    
    issn = journal.get('issn', '')
    if issn == 'N/A':
        issn = ''
    
    key = f"{eissn},{issn}"
    
    try:
        jif_2019 = float(journal['jif2019'])
    except ValueError:
        jif_2019 = 0
    
    total_cites = journal['totalCites']
    output[key] = {'totalCites': total_cites, 'jif2019': jif_2019}

with open('eissn.json', 'w') as f:
    json.dump(output, f)