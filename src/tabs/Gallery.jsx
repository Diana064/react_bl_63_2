import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    img: [],
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      ImageService.getImages(this.state.query, this.state.page).then(data => {
        console.log(data);
      });
    }
  }
  onSubmit = query => {
    this.setState({ query });
  };
  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
      </>
    );
  }
}
