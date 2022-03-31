import { BrandModel } from '../../models/BrandModel';
import './Brand.scss';

type Props = {
  brand: BrandModel;
};

export default function Brand(props: Props) {
  const { brand } = props;
  return (
    <div className="brand">
      <div className="brand-logo">
        <img src={`file://${brand.logoPath}`} alt={brand.name} />
      </div>
      <div className="brand-content">
        <h3 id={brand.id.toString()} className="brand-title">
          {brand.name}
        </h3>
        <p className="brand-theme">theme</p>
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
