class Favorite {
  favoriteName = "";
  favoriteID = null;
  Favorite() {}
  setFavoriteName(name) {
    this.favoriteName = name;
  }
  setFavoriteID(id) {
    this.favoriteID = id;
  }
  getFavoriteAsObject() {
    const favorite = { name: this.favoriteName, ID: this.favoriteID };
    return favorite;
  }
}
export default Favorite;
