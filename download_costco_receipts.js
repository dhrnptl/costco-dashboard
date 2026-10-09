// Costco Receipt Downloader Script
// Usage:
// 1. Log in to your Costco account at https://www.costco.com/OrderStatusCmd
// 2. Open Developer Tools console (F12 or Cmd+Option+I on Mac)
// 3. Copy and paste this script into the console and press Enter.

async function listReceipts(startDate, endDate) {
    return await new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://ecom-api.costco.com/ebusiness/order/v1/orders/graphql');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Costco.Env', 'ecom');
        xhr.setRequestHeader('Costco.Service', 'restOrders');
        
        const clientId = localStorage.getItem('clientID') || '';
        const idToken = localStorage.getItem('idToken') || '';
        
        if (!idToken) {
            console.warn('Warning: idToken not found in localStorage. Ensure you are logged into Costco.com.');
        }
        
        xhr.setRequestHeader('Costco-X-Wcs-Clientid', clientId);
        xhr.setRequestHeader('Client-Identifier', '481b1aec-aa3b-454b-b81b-48187e28f205');
        xhr.setRequestHeader('Costco-X-Authorization', 'Bearer ' + idToken);
        
        const listReceiptsQuery = {
            "query": `
                query receipts($startDate: String!, $endDate: String!) {
                  receipts(startDate: $startDate, endDate: $endDate) {
                    warehouseName
                    documentType
                    transactionDateTime
                    transactionDate
                    companyNumber
                    warehouseNumber
                    operatorNumber
                    warehouseShortName
                    registerNumber
                    transactionNumber
                    transactionType
                    transactionBarcode
                    total
                    warehouseAddress1
                    warehouseAddress2
                    warehouseCity
                    warehouseState
                    warehouseCountry
                    warehousePostalCode
                    totalItemCount
                    subTotal
                    taxes
                    itemArray {
                        itemNumber
                        itemDescription01
                        frenchItemDescription1
                        itemDescription02
                        frenchItemDescription2
                        itemIdentifier
                        unit
                        amount
                        taxFlag
                        merchantID
                        entryMethod
                    }
                    tenderArray {
                        tenderTypeCode
                        tenderDescription
                        amountTender
                        displayAccountNumber
                        sequenceNumber
                        approvalNumber
                        responseCode
                        transactionID
                        merchantID
                        entryMethod
                    }
                    couponArray {
                        upcnumberCoupon
                        voidflagCoupon
                        refundflagCoupon
                        taxflagCoupon
                        amountCoupon
                    }
                    subTaxes {
                        tax1
                        tax2
                        tax3
                        tax4
                        aTaxPercent
                        aTaxLegend
                        aTaxAmount
                        bTaxPercent
                        bTaxLegend
                        bTaxAmount
                        cTaxPercent
                        cTaxLegend
                        cTaxAmount
                        dTaxAmount
                    }
                    instantSavings
                    membershipNumber
                  }
                }`.replace(/\s+/g,' '),
            "variables": {
                "startDate": startDate,
                "endDate": endDate
            }
        };

        xhr.onload = function() {
            if (xhr.status === 200 && xhr.response) {
                if (xhr.response.errors && xhr.response.errors.length > 0) {
                    console.error('GraphQL Errors:', xhr.response.errors);
                    reject(xhr.response.errors);
                    return;
                }
                if (xhr.response.data && xhr.response.data.receipts) {
                    resolve(xhr.response.data.receipts);
                } else {
                    reject('No receipts data returned in response');
                }
            } else {
                reject(`HTTP Error ${xhr.status}: ${xhr.statusText}`);
            }
        };

        xhr.onerror = function() {
            reject('Network request failed');
        };

        xhr.send(JSON.stringify(listReceiptsQuery));
    });
}

async function downloadReceipts(options = {}) {
    const yearsBack = options.yearsBack || 2;
    const now = new Date();
    
    // Calculate default start date (yearsBack prior to today)
    const startDate = options.startDate 
        ? new Date(options.startDate) 
        : new Date(now.getFullYear() - yearsBack, now.getMonth(), now.getDate());

    const formatDate = (d) => {
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(now);

    console.log(`fetching Costco receipts from ${startDateStr} to ${endDateStr}...`);

    try {
        const receipts = await listReceipts(startDateStr, endDateStr);
        console.log(` Successfully retrieved ${receipts.length} receipts!`);
        
        const filename = `costco-receipts-${now.toISOString().slice(0,10)}.json`;
        const blob = new Blob([JSON.stringify(receipts, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        console.log(` Saved receipts to ${filename}`);
        return receipts;
    } catch (err) {
        console.error(' Failed to download Costco receipts:', err);
    }
}

// Auto-run download for last 2 years by default
await downloadReceipts();
