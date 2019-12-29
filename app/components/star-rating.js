import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class StarRating extends Component{
  @tracked classNames= ['rating-panel']

  @tracked rating= 0
  @tracked maxRating = 5
  @tracked onClick() {}

  get stars()   /*: computed('rating', 'maxRating', function()*/ {
    let stars = [];
    for (let i = 1; i <= this.maxRating; i++) {
      stars.push({ rating: i, isFull: this.rating >= i });
    }
    return stars;
  }

  @action 
    setRating(newRating) {
      return this.onClick(newRating);
    }
}
