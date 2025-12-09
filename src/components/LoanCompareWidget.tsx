import { RATE_RANGES } from '@/data/rateRanges';
import LegalNote from './LegalNote';
import { getRateUpdatedText } from '@/lib/rates';

export default function LoanCompareWidget() {
  const updatedAt = getRateUpdatedText();
  return (
    <aside className="side-card loan-widget">
      <h3 className="loan-widget-title">📊 Loan Interest Rate Ranges</h3>

      <div className="loan-list">
        <div className="loan-offer-row">
          <strong>{RATE_RANGES.personalLoan.label}</strong>
          <span className="loan-range">{RATE_RANGES.personalLoan.range}</span>
        </div>

        <div className="loan-offer-row">
          <strong>{RATE_RANGES.homeLoan.label}</strong>
          <span className="loan-range">{RATE_RANGES.homeLoan.range}</span>
        </div>

        <div className="loan-offer-row">
          <strong>{RATE_RANGES.carLoan.label}</strong>
          <span className="loan-range">{RATE_RANGES.carLoan.range}</span>
        </div>

        <div className="loan-offer-row">
          <strong>{RATE_RANGES.fd.label}</strong>
          <span className="loan-range">{RATE_RANGES.fd.range}</span>
        </div>

        <div className="loan-offer-row">
          <strong>{RATE_RANGES.sip.label}</strong>
          <span className="loan-range">{RATE_RANGES.sip.range}</span>
        </div>
      </div>
      <LegalNote />
      <div className="loan-widget-footer">
        <small>Rates updated as of {updatedAt}</small>
      </div>
    </aside>
  );
}
