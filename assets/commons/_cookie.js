export const cookie = {
/**
 * Ecris un cookie
 * @param  {String} cname     Le nom du cookie à écrire
 * @param  {String} cname La valeur du cookie à écrire
 * @param  {Number} exdays La durée en jour avant que le cookie n'expire
 */
  set: (cname, cvalue, exdays) => {
    let expires;
    if(exdays){
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      expires = "expires="+ d.toUTCString();
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

  },
/**
 * Lit un cookie
 * @param  {String} cname     Le nom du cookie à lire
 * @return {String}           Retourne la valeur du cookie, ou une chaîne vide
 */
  get: (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
  },
/**
 * Supprimer un cookie
 * @param  {String} cname     Le nom du cookie à supprimer
 */
  delete: (cname) => {
    this.set(cname, "", -1);
  }
}