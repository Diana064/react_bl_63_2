import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    showBtn: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      ImageService.getImages(this.state.query, this.state.page)
        .then(({ photos, total_results }) => {
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photos],
            showBtn: this.state.page < Math.ceil(total_results / 15),
          }));
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
  onSubmit = query => {
    this.setState({ query });
  };

  handleClickBtn = () => {
    console.log(`Click`);
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { showBtn, photos } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Grid>
          {photos.map(({ id, avg_color, alt, src }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {showBtn && <Button onClick={this.handleClickBtn}>Load more</Button>}
      </>
    );
  }
}
