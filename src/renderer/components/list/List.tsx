import { useEffect, useState } from 'react';
import { getBrands } from '../../services/BrandService';
import { BrandModel } from '../../models/BrandModel';
import { Brand } from '../brand/Brand';

type Props = {
  path: string;
};

/*
export class List extends Component<Props, State> {
  brandItems: JSX.Element[] = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      brands: [],
    };
    this.log = this.log.bind(this);
  }

  componentDidUpdate(prevProps: Readonly<Props>, _prevState: Readonly<State>) {
    if (prevProps.path !== this.props.path) {
      this.setState({
        brands: getBrands(this.props.path),
      });
    }
  }

  getBrands(): BrandModel[] {
    console.log('getBrands');
    return getBrands(this.props.path);
  }

  log() {
    console.log('yaaay', this.state.brands);
    console.log('yaaaaay', this.brandItems.length);
  }

  render() {
    return (
      <>
        <button onClick={this.log}>Log</button>
        <h3>{this.props.path}</h3>
        <ul>
          {this.state.brands.map((brand) => {
            return <li key={brand.id}>{brand.name}</li>;
          })}
        </ul>
      </>
    );
  }
} */

export default function List({ path }: Props) {
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [brandItems, setBrandItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    console.log('path', path);
    const newBrands = getBrands(path);
    console.log('newBrands', newBrands);
    setBrands(newBrands);
  }, [path]);

  useEffect(() => {
    console.log('brands', brands);
    const newBrandItems = brands.map((brand) => {
      return <Brand key={brand.id} brand={brand} />;
    });
    console.log('after brandItems', newBrandItems);
    setBrandItems(newBrandItems);
  }, [brands]);

  return (
    <>
      <h3>{path}</h3>
      <p>{brands?.length}</p>
      <ul>{brandItems}</ul>
    </>
  );
}
