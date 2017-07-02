class Sizer {
    constructor(className, displayClass=null) {
        var instance = this;
        this.scan_grids(className, displayClass);
        document.body.onresize = function() { instance.scan_grids(className, displayClass); };
    }

	/**
	 * Scans elements that have the given class name 
	 * for width and height and adds a bootstrap tooltip
	 * to the element.
	 *
	 * @param: {string} className 	 Class name to search for
	 * @param: {string} displayClass Class name to use as size display
 	 */
	scan_grids(className, displayClass) {
		// Get all elements tagged to be scanned
		var divs = document.getElementsByClassName(className);
		for (var idx = 0; idx < divs.length; idx++) {
			// Get the computed style width and height
			var width = this.getStyleProperty(divs[idx], 'width');
			var height = this.getStyleProperty(divs[idx], 'height');
			
			// check that we got a value for width and height
			if(width && height) {
				var size_text = 'Width: ' + width + ' Height: ' + height;

				this.set_tooltip(divs[idx], size_text);

                if(displayClass && displayClass != '') {
                    this.set_display(divs[idx], displayClass, size_text);
                }
    			
			}
		}
	}

	/**
	 * Set the bootstrap tool tip to an element
	 *
	 * @param: {element} element 	element to set the tooltip on 
	 * @param: {string} value 		tooltip value
 	 */
	set_tooltip(element, value) {
	    // Lets make sure the tooltip attribute is set
		element.setAttribute('data-toggle', 'tooltip');
		// Lets set the tooltip value
		element.setAttribute('title', value);
	}

	/**
	 * Set the value to the child element with the class name
	 *
	 * @param: {element} parent 	 parent element to search for child
	 * @param: {string} displayClass Class name to use as size display
	 * @param: {string} value 		 value to set on the child element
 	 */
	set_display(parent, displayClass, value) {
		// try to get the child elements with the given class name	
		var displays = parent.getElementsByClassName(displayClass);
		for (var idx = 0; idx < displays.length; idx++) {
			// set the value 
			displays[idx].innerHTML = value;
		}
	}

	/**
	 * Gets the computed style value from element
	 * 
	 * @param: {element} element 	Element to get the style from
	 * @param: {string}	 name 		Name of the property to get 
	 * 
	 * @return: {string} 			Property value 
	 */
	getStyleProperty(element, name) {
		/* 
		 *  declare the variable to null so if shit goes wrong 
		 *  we can know something went wrong and avoid errors 
		 */
		var style_value = null;
		// check that we got something 
		if (element) {
			// Get the property requested
			style_value = getComputedStyle(element, null).getPropertyValue(name);
		}
		// return the value 
		return style_value;
	}
}