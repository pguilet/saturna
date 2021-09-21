const keys = require('../../config/keys');
module.exports = (config) => {
     return `
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta
                http-equiv="Content-Type"
                content="text/html; charset=utf-8"
            />
            <title>QuittanceDeLoyer17505273741058770595</title>
            <style type="text/css"></style>
        </head>
        <body>
            <p
                class="s1"
                style="padding-top: 3pt;padding-left: 4pt;text-indent: 0pt;text-align: center;"
            >
                Quittance de loyer
            </p>
            <p style="text-indent: 0pt;text-align: left;">
                <br />
            </p>
            <p style="padding-top: 10pt;text-indent: 0pt;text-align: right;">
                Quittance émise le ${config.sendingDate}
            </p>
            <p style="text-indent: 0pt;text-align: left;">
                <br />
            </p>
            <h1 style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                Mandataire
            </h1>
            <p style="padding-top: 3pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                ${config.mandataireName}
            </p>
            <p style="padding-top: 2pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">
                ${config.mandataireAddress}
            </p>
            <p style="text-indent: 0pt;text-align: left;">
                <br />
            </p>
            <p
                class="s1"
                style="padding-left: 5pt;text-indent: 0pt;text-align: left;"
            >
                QUITTANCE DE LOYER
            </p>
            <p style="text-indent: 0pt;text-align: left;">
                <br />
            </p>
            <p style="text-indent: 0pt;text-align: left;">
                <br />
            </p>
            <h1 style="padding-left: 4pt;text-indent: 0pt;text-align: center;">
                Locataire
            </h1>
            <p style="padding-top: 3pt;padding-left: 4pt;text-indent: 0pt;text-align: center;">
                ${config.renterNames}
            </p>
            <p style="text-indent: 0pt;text-align: left;">
                <br />
            </p>
            <table
                style="border-collapse:collapse;margin-left:5.9pt"
                cellspacing="0"
            >
                <tr style="height:29pt">
                        <td style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br />
                            </p>
                            <p
                                class="s2"
                                style="padding-left: 8pt;text-indent: 0pt;text-align: left;"
                            >
                                Adresse du bien en location
                            </p>
                        </td>
                        <td style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br />
                            </p>
                            <p
                                class="s2"
                                style="padding-left: 8pt;text-indent: 0pt;text-align: left;"
                            >
                                ${config.propertyAddress}
                            </p>
                        </td>
                </tr>
                <tr style="height:29pt">
                        <td style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br />
                            </p>
                            <p
                                class="s2"
                                style="padding-left: 8pt;text-indent: 0pt;text-align: left;"
                            >
                                Loyer mensuel contractuel
                            </p>
                        </td>
                        <td style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br />
                            </p>
                            <p
                                class="s2"
                                style="padding-left: 8pt;text-indent: 0pt;text-align: left;"
                            >
                                ${config.rentPrice}€
                            </p>
                        </td>
                </tr>
                <tr style="height:29pt">
                        <td style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br />
                            </p>
                            <p
                                class="s2"
                                style="padding-left: 8pt;text-indent: 0pt;text-align: left;"
                            >
                                Charges mensuelles contractuelles
                            </p>
                        </td>
                        <td style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br />
                            </p>
                            <p
                                class="s2"
                                style="padding-left: 8pt;text-indent: 0pt;text-align: left;"
                            >
                                ${config.rentCharges}€
                            </p>
                        </td>
                </tr>
                <tr style="height:29pt">
                        <td style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br />
                            </p>
                            <p
                                class="s2"
                                style="padding-left: 8pt;text-indent: 0pt;text-align: left;"
                            >
                                Période concernée
                            </p>
                        </td>
                        <td style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br />
                            </p>
                            <p
                                class="s2"
                                style="padding-left: 8pt;text-indent: 0pt;text-align: left;"
                            >
                                Du ${config.rentStartDate} au ${
          config.rentEndDate
     }
                            </p>
                        </td>
                </tr>
                <tr style="height:29pt">
                        <td style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br />
                            </p>
                            <p
                                class="s2"
                                style="padding-left: 8pt;text-indent: 0pt;text-align: left;"
                            >
                                Sommes payées au bailleur ${
                                     config.prorata ? '(prorata)' : ''
                                }
                            </p>
                        </td>
                        <td style="width:269pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                            <p style="text-indent: 0pt;text-align: left;">
                                <br />
                            </p>
                            <p
                                class="s2"
                                style="padding-left: 8pt;text-indent: 0pt;text-align: left;"
                            >
                                ${config.paidRent}€
                            </p>
                        </td>
                </tr>
            </table>
            <p style="text-indent: 0pt;text-align: left;">
                <br />
            </p>
            <p style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;line-height: 109%;text-align: left;">
                Cette quittance annule tous les reçus qui auraient
                pu être transmis en cas de paiement partiel de la
                présente échéance.
            </p>
            <p style="text-indent: 0pt;text-align: left;">
                <br />
            </p>
           
            <p style="text-indent: 0pt;text-align: left;">
                <br />
            </p>
        </body>
        </html>
    `;
};
