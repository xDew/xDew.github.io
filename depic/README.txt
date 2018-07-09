A Pen created at CodePen.io. You can find this one at https://codepen.io/travis-g/pen/mywWyq.

 A basic responsive and template for Cydia package depiction pages. It reacts to Cydia useragent strings via JavaScript to allow for differing web browser and Cydia browser views.

Within the `head` tag settings is the script that performs the useragent check. When viewed inside Cydia the root `html` tag receives a `.cydia` class, and the relevant CSS styles are applied (i.e. the `header` and "View in Cydia" button do not appear).