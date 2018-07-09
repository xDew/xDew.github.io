/*jslint
  node: true,
  sloppy: true,
  browser: true,
  todo: true
*/
/*global
  action,
  menu
*/


/**
 * Loading fonts from external file and uploading
 *
 *
 */



action.addFont = function () {
    menu.toggle();
    var fragment = document.createDocumentFragment(),
        holder = document.createElement('div'),
        inst = document.createElement('div'),
        close = document.createElement('div');
        close.innerHTML = "X";
        close.id = "userAddedFontsCloser";
        close.onclick = function () {
            document.getElementById('userFontHolder').remove();
        };
        inst.innerHTML = "Add .otf fonts to /Library/LockPlus/fonts/ </br></br> Select a font below to add to the creator. </br> Creator will automatically reload when font is uploaded. </br></br> Choose uploaded font from element edit menu.";
        inst.id = "fontInstructions";

        holder.id = "userFontHolder";
        fragment.appendChild(holder);
        holder.appendChild(inst);
        holder.appendChild(close);

    for (i = 0; i < userAddedFonts.length; i += 1) {
        li = document.createElement('li');
        if(userAddedFonts[i].length == 0){
            li.innerHTML = "You have no fonts added.";
        }else{
            li.innerHTML = userAddedFonts[i];
        }
        li.title = userAddedFonts[i];
        li.onclick = function(el){
            document.getElementById('userFontHolder').remove();
            window.location = "uploadfont:Library/LockPlus/fonts/" + el.target.title + ".otf~" + el.target.title + ".otf";
        }
        holder.appendChild(li);
    }

    document.getElementById('container').appendChild(fragment);
};
