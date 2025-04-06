import {TabCategory} from '../type/types';

export class MovieQueryBuilders {
  constructor(
    private readonly tabCategory: TabCategory,
    private readonly searchQuery: string,
    private readonly page: number,
  ) {}

  private getSearchQuery() {
    return `search/movie?query=${this.searchQuery}&language=en-US&page=${this.page}`;
  }

  private getTabCategoryQuery() {
    return `movie/${this.tabCategory}?language=en-US&page=${this.page}`;
  }

  build() {
    if (this.searchQuery) {
      return this.getSearchQuery();
    }

    return this.getTabCategoryQuery();
  }
}
