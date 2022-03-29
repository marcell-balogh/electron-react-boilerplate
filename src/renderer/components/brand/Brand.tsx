import { Component } from 'react';
import { BrandModel } from '../../models/BrandModel';

interface Props {
  brand: BrandModel;
}

interface State {
  brand: BrandModel;
}

export class Brand extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      brand: props.brand,
    };
  }

  render() {
    return (
      <>
        <p id={this.state.brand.id.toString()} className="brand-title">
          {this.state.brand.name}
        </p>
      </>
    );
  }
}
