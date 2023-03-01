import React, { useState } from 'react';


export function Select({
    label,
    currencies
}: FormFieldProps) {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="input-group">
            <label htmlFor={label}>{label}</label>
            <div className="select"  id={label}>
                <div className="trigger" onClick={e => setDropdownOpen(!dropdownOpen)}></div>
                {
                    dropdownOpen && (
                        <div className="dropdown" >
                            { currencies.map((c: ApiCurrency) => (
                                <div
                                    className="option"
                                    key={c.ISOCurrencyCode}
                                >
                                    {c.ISOCurrencyCode} - {c.CurrencyEnglishName}
                                </div>
                            ))}
                        </div>
                    )
                }

                
            </div>
        </div>
    )
}

interface FormFieldProps {
    label: string;
    currencies: ApiCurrency[];
}

export interface ApiCurrency {
    ISOCurrencyCode: string,
    CurrencySymbol: string,
    CurrencyEnglishName: string,
    CountryName: string,
    CountryThreeLetterCode: string,
    CountryISOTwoLetterCode: string,
    IsEuropeanUnionMember: boolean
  }

