import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term : '',
      location : '',
      sortBy : 'best_match',
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    }
  }

  renderSortByOptions(){
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return <li className={this.getSortByClass(sortByOptionValue)}
      onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
      key={sortByOptionValue}>
      {sortByOption}
      </li>;
    });
  }
  getSortByClass(sortByOption){
    return (this.state.sortBy === sortByOption) ? 'active' : '';
  }
  handleSortByChange(sortByOption){
    this.setState({sortBy: sortByOption});
  }
  handleTermChange(event){
    const term = event.target.value;
    this.setState({term: term});
  }
  handleLocationChange(event){
    const location = event.target.value;
    this.setState({location: location});
  }
  handleSearch(event){
    const term = this.state.term;
    const location = this.state.location;
    const sortBy = this.state.sortBy;
    this.props.searchYelp(term, location, sortBy);
    event.preventDefault();
  }
  render(){
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" onChange={this.handleTermChange} />
          <input placeholder="Where?" onChange={this.handleLocationChange} />
        </div>
        <div className="SearchBar-submit" onClick={this.handleSearch} >
          <a>Let's Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;