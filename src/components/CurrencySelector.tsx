import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn' },
  { code: 'ISK', name: 'Icelandic Krona', symbol: 'kr' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب' },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼' },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا' },
  { code: 'LBP', name: 'Lebanese Pound', symbol: '£' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج' },
  { code: 'LYD', name: 'Libyan Dinar', symbol: 'ل.د' },
  { code: 'SDG', name: 'Sudanese Pound', symbol: 'ج.س.' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'XOF', name: 'West African Franc', symbol: 'CFA' },
  { code: 'XAF', name: 'Central African Franc', symbol: 'FCFA' },
  { code: 'MUR', name: 'Mauritian Rupee', symbol: '₨' },
  { code: 'SCR', name: 'Seychellois Rupee', symbol: '₨' },
  { code: 'MGA', name: 'Malagasy Ariary', symbol: 'Ar' },
  { code: 'KMF', name: 'Comorian Franc', symbol: 'CF' },
  { code: 'DJF', name: 'Djiboutian Franc', symbol: 'Fdj' },
  { code: 'SOS', name: 'Somali Shilling', symbol: 'S' },
  { code: 'ERN', name: 'Eritrean Nakfa', symbol: 'Nfk' },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'R₣' },
  { code: 'BIF', name: 'Burundian Franc', symbol: 'FBu' },
  { code: 'CDF', name: 'Congolese Franc', symbol: 'FC' },
  { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz' },
  { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT' },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK' },
  { code: 'ZWL', name: 'Zimbabwean Dollar', symbol: 'Z$' },
  { code: 'BWP', name: 'Botswanan Pula', symbol: 'P' },
  { code: 'NAD', name: 'Namibian Dollar', symbol: 'N$' },
  { code: 'SZL', name: 'Swazi Lilangeni', symbol: 'E' },
  { code: 'LSL', name: 'Lesotho Loti', symbol: 'L' },
  { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK' },
  { code: 'GMD', name: 'Gambian Dalasi', symbol: 'D' },
  { code: 'GNF', name: 'Guinean Franc', symbol: 'FG' },
  { code: 'SLE', name: 'Sierra Leonean Leone', symbol: 'Le' },
  { code: 'LRD', name: 'Liberian Dollar', symbol: 'L$' },
  { code: 'CVE', name: 'Cape Verdean Escudo', symbol: '$' },
  { code: 'STN', name: 'São Tomé and Príncipe Dobra', symbol: 'Db' }
];

const CurrencySelector = ({ selectedCurrency, onCurrencyChange }: CurrencySelectorProps) => {
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-2xl px-4 py-2 shadow-sm border border-white/20">
      <Globe className="h-4 w-4 text-purple-600" />
      <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
        <SelectTrigger className="border-0 bg-transparent shadow-none focus:ring-0 min-w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-md border-white/20 rounded-2xl shadow-xl max-h-60">
          {currencies.map((currency) => (
            <SelectItem 
              key={currency.code} 
              value={currency.code}
              className="rounded-xl hover:bg-purple-50/80 focus:bg-purple-50/80"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{currency.symbol}</span>
                <span>{currency.code}</span>
                <span className="text-sm text-gray-500">- {currency.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;