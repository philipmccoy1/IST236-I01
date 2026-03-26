class Destination {
  constructor(
    id,
    countryIds,
    name,
    averageCost,
    yearFounded,
    averageRating,
    description,
    imageUrl
  ) {
    this.id = id;
    this.countryIds = countryIds;
    this.name = name;
    this.averageCost = averageCost;
    this.yearFounded = yearFounded;
    this.averageRating = averageRating;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}

export default Destination;