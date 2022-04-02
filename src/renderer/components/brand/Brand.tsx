import { BrandModel } from '../../models/BrandModel';
import './Brand.scss';

type Props = {
  brand: BrandModel;
};

export default function Brand(props: Props) {
  const { brand } = props;
  const primary = {
    fill: brand.theme.primaryColor,
  };
  const secondary = {
    fill: brand.theme.secondaryColor,
  };
  return (
    <div className="brand">
      <div className="brand-logo">
        <img src={`file://${brand.logoPath}`} alt={brand.name} />
      </div>
      <div className="brand-content">
        <h3 id={brand.id.toString()} className="brand-title">
          {brand.name}
        </h3>
        <p className="brand-theme">Schema: {brand.theme.scheme}</p>
        <p className="brand-theme">
          <svg width="12" height="12">
            <rect width="12" height="12" style={primary} />
          </svg>{' '}
          Primary color: {brand.theme.primaryColor}
        </p>
        {brand.theme.scheme === 'primary' && (
          <p className="brand-theme">
            <svg width="12" height="12">
              <rect width="12" height="12" style={secondary} />
            </svg>{' '}
            Secondary color: {brand.theme.secondaryColor}
          </p>
        )}
      </div>
      <div className="brand-buttons">
        <button type="button" className="edit">
          Edit
        </button>
        <button type="button" className="delete">
          Delete
        </button>
      </div>
    </div>
  );
}
