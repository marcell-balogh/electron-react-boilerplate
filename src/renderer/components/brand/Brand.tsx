import { Component } from 'react';
import { BrandModel } from '../../models/BrandModel';

interface Props {
  brand: BrandModel;
}

interface State {
  brand: BrandModel;
}

class Brand extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {} as State;
  }

  render() {
    return (
      <>
        <h3 className="brand-title">{this.state.brand.name}</h3>
        <img
          className="brand-img"
          src={this.state.brand.logo}
          alt="brand logo"
        />
      </>
    );
  }
}

export default Brand;
