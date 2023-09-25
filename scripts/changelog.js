onload = loadChangelog
function loadChangelog() {
  window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
    };
    console.info(window.mobileCheck())
    if(window.mobileCheck()){
      window.location = "https://csauto.netlify.app/mobile";
    }
  getReleasesDescription("murkyyt", "csauto")
}
function httpGet(theUrl, callback) {
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  }
  else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.info("Got web info from " + theUrl)
      callback(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", theUrl, false);
  xmlhttp.send();
}
function getReleasesDescription(username, repo) {
  let url = `https://api.github.com/repos/${username}/${repo}/releases`;
  let result = []
  httpGet(url, function (resp) {
    split = resp.split("\"body\": \"")
    for (let index = 1; index < split.length; index++) {
      let res = split[index].split('}')[0].replaceAll("\\\"", "\"").replaceAll("\\r", "\r").replaceAll("\\n", "\n");
      res = res.split("\"mentions_count\"")[0]
      res = res.split("[VirusTotal")[0]
      res = res.substring(0, res.length - 4)

      converter = new showdown.Converter(),
        html = converter.makeHtml(res.split("**Full Changelog")[0]);
      result[index - 1] = html
      document.body.insertAdjacentHTML('beforeend', html)
    }
  });
  var elems = document.body.getElementsByTagName("*");
  for (let index = 0; index < elems.length; index++) {
    const element = elems[index];
    if (element.nodeName == "A") {
      if (element.hasAttribute("href") && element.getAttribute("href").substring(0, "https://".length) == "https://" &&  element.getAttribute("href") != "https://csauto.netlify.app/") {
        element.className = "link"
      }
    }
  }
  return result
}

;/*! showdown v 2.0.0 - 10-03-2022 */
(function () {
  /**
   * Created by Tivie on 13-07-2015.
   */
  function getDefaultOpts(simple) {
    'use strict';

    var defaultOptions = {
      omitExtraWLInCodeBlocks: {
        defaultValue: false,
        describe: 'Omit the default extra whiteline added to code blocks',
        type: 'boolean'
      },
      noHeaderId: {
        defaultValue: false,
        describe: 'Turn on/off generated header id',
        type: 'boolean'
      },
      prefixHeaderId: {
        defaultValue: false,
        describe: 'Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic \'section-\' prefix',
        type: 'string'
      },
      rawPrefixHeaderId: {
        defaultValue: false,
        describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
        type: 'boolean'
      },
      ghCompatibleHeaderId: {
        defaultValue: false,
        describe: 'Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)',
        type: 'boolean'
      },
      rawHeaderId: {
        defaultValue: false,
        describe: 'Remove only spaces, \' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids',
        type: 'boolean'
      },
      headerLevelStart: {
        defaultValue: false,
        describe: 'The header blocks level start',
        type: 'integer'
      },
      parseImgDimensions: {
        defaultValue: false,
        describe: 'Turn on/off image dimension parsing',
        type: 'boolean'
      },
      simplifiedAutoLink: {
        defaultValue: false,
        describe: 'Turn on/off GFM autolink style',
        type: 'boolean'
      },
      literalMidWordUnderscores: {
        defaultValue: false,
        describe: 'Parse midword underscores as literal underscores',
        type: 'boolean'
      },
      literalMidWordAsterisks: {
        defaultValue: false,
        describe: 'Parse midword asterisks as literal asterisks',
        type: 'boolean'
      },
      strikethrough: {
        defaultValue: false,
        describe: 'Turn on/off strikethrough support',
        type: 'boolean'
      },
      tables: {
        defaultValue: false,
        describe: 'Turn on/off tables support',
        type: 'boolean'
      },
      tablesHeaderId: {
        defaultValue: false,
        describe: 'Add an id to table headers',
        type: 'boolean'
      },
      ghCodeBlocks: {
        defaultValue: true,
        describe: 'Turn on/off GFM fenced code blocks support',
        type: 'boolean'
      },
      tasklists: {
        defaultValue: false,
        describe: 'Turn on/off GFM tasklist support',
        type: 'boolean'
      },
      smoothLivePreview: {
        defaultValue: false,
        describe: 'Prevents weird effects in live previews due to incomplete input',
        type: 'boolean'
      },
      smartIndentationFix: {
        defaultValue: false,
        describe: 'Tries to smartly fix indentation in es6 strings',
        type: 'boolean'
      },
      disableForced4SpacesIndentedSublists: {
        defaultValue: false,
        describe: 'Disables the requirement of indenting nested sublists by 4 spaces',
        type: 'boolean'
      },
      simpleLineBreaks: {
        defaultValue: false,
        describe: 'Parses simple line breaks as <br> (GFM Style)',
        type: 'boolean'
      },
      requireSpaceBeforeHeadingText: {
        defaultValue: false,
        describe: 'Makes adding a space between `#` and the header text mandatory (GFM Style)',
        type: 'boolean'
      },
      ghMentions: {
        defaultValue: false,
        describe: 'Enables github @mentions',
        type: 'boolean'
      },
      ghMentionsLink: {
        defaultValue: 'https://github.com/{u}',
        describe: 'Changes the link generated by @mentions. Only applies if ghMentions option is enabled.',
        type: 'string'
      },
      encodeEmails: {
        defaultValue: true,
        describe: 'Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities',
        type: 'boolean'
      },
      openLinksInNewWindow: {
        defaultValue: false,
        describe: 'Open all links in new windows',
        type: 'boolean'
      },
      backslashEscapesHTMLTags: {
        defaultValue: false,
        describe: 'Support for HTML Tag escaping. ex: \<div>foo\</div>',
        type: 'boolean'
      },
      emoji: {
        defaultValue: false,
        describe: 'Enable emoji support. Ex: `this is a :smile: emoji`',
        type: 'boolean'
      },
      underline: {
        defaultValue: false,
        describe: 'Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`',
        type: 'boolean'
      },
      ellipsis: {
        defaultValue: true,
        describe: 'Replaces three dots with the ellipsis unicode character',
        type: 'boolean'
      },
      completeHTMLDocument: {
        defaultValue: false,
        describe: 'Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags',
        type: 'boolean'
      },
      metadata: {
        defaultValue: false,
        describe: 'Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).',
        type: 'boolean'
      },
      splitAdjacentBlockquotes: {
        defaultValue: false,
        describe: 'Split adjacent blockquote blocks',
        type: 'boolean'
      },
      moreStyling: {
        defaultValue: false,
        describe: 'Adds some useful styling css classes in the generated html',
        type: 'boolean'
      },
      relativePathBaseUrl: {
        defaultValue: false,
        describe: 'Prepends a base URL to relative paths',
        type: 'string'
      },
    };
    if (simple === false) {
      return JSON.parse(JSON.stringify(defaultOptions));
    }
    var ret = {};
    for (var opt in defaultOptions) {
      if (defaultOptions.hasOwnProperty(opt)) {
        ret[opt] = defaultOptions[opt].defaultValue;
      }
    }
    return ret;
  }

  function allOptionsOn() {
    'use strict';
    var options = getDefaultOpts(true),
      ret = {};
    for (var opt in options) {
      if (options.hasOwnProperty(opt)) {
        ret[opt] = true;
      }
    }
    return ret;
  }

  /**
   * Created by Tivie on 06-01-2015.
   */
  // Private properties
  var showdown = {},
    parsers = {},
    extensions = {},
    globalOptions = getDefaultOpts(true),
    setFlavor = 'vanilla',
    flavor = {
      github: {
        omitExtraWLInCodeBlocks: true,
        simplifiedAutoLink: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true,
        disableForced4SpacesIndentedSublists: true,
        simpleLineBreaks: true,
        requireSpaceBeforeHeadingText: true,
        ghCompatibleHeaderId: true,
        ghMentions: true,
        backslashEscapesHTMLTags: true,
        emoji: true,
        splitAdjacentBlockquotes: true
      },
      original: {
        noHeaderId: true,
        ghCodeBlocks: false
      },
      ghost: {
        omitExtraWLInCodeBlocks: true,
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true,
        smoothLivePreview: true,
        simpleLineBreaks: true,
        requireSpaceBeforeHeadingText: true,
        ghMentions: false,
        encodeEmails: true
      },
      vanilla: getDefaultOpts(true),
      allOn: allOptionsOn()
    };

  /**
   * helper namespace
   * @type {{}}
   */
  showdown.helper = {};

  /**
   * TODO LEGACY SUPPORT CODE
   * @type {{}}
   */
  showdown.extensions = {};

  /**
   * Set a global option
   * @static
   * @param {string} key
   * @param {*} value
   * @returns {showdown}
   */
  showdown.setOption = function (key, value) {
    'use strict';
    globalOptions[key] = value;
    return this;
  };

  /**
   * Get a global option
   * @static
   * @param {string} key
   * @returns {*}
   */
  showdown.getOption = function (key) {
    'use strict';
    return globalOptions[key];
  };

  /**
   * Get the global options
   * @static
   * @returns {{}}
   */
  showdown.getOptions = function () {
    'use strict';
    return globalOptions;
  };

  /**
   * Reset global options to the default values
   * @static
   */
  showdown.resetOptions = function () {
    'use strict';
    globalOptions = getDefaultOpts(true);
  };

  /**
   * Set the flavor showdown should use as default
   * @param {string} name
   */
  showdown.setFlavor = function (name) {
    'use strict';
    if (!flavor.hasOwnProperty(name)) {
      throw Error(name + ' flavor was not found');
    }
    showdown.resetOptions();
    var preset = flavor[name];
    setFlavor = name;
    for (var option in preset) {
      if (preset.hasOwnProperty(option)) {
        globalOptions[option] = preset[option];
      }
    }
  };

  /**
   * Get the currently set flavor
   * @returns {string}
   */
  showdown.getFlavor = function () {
    'use strict';
    return setFlavor;
  };

  /**
   * Get the options of a specified flavor. Returns undefined if the flavor was not found
   * @param {string} name Name of the flavor
   * @returns {{}|undefined}
   */
  showdown.getFlavorOptions = function (name) {
    'use strict';
    if (flavor.hasOwnProperty(name)) {
      return flavor[name];
    }
  };

  /**
   * Get the default options
   * @static
   * @param {boolean} [simple=true]
   * @returns {{}}
   */
  showdown.getDefaultOptions = function (simple) {
    'use strict';
    return getDefaultOpts(simple);
  };

  /**
   * Get or set a subParser
   *
   * subParser(name)       - Get a registered subParser
   * subParser(name, func) - Register a subParser
   * @static
   * @param {string} name
   * @param {function} [func]
   * @returns {*}
   */
  showdown.subParser = function (name, func) {
    'use strict';
    if (showdown.helper.isString(name)) {
      if (typeof func !== 'undefined') {
        parsers[name] = func;
      } else {
        if (parsers.hasOwnProperty(name)) {
          return parsers[name];
        } else {
          throw Error('SubParser named ' + name + ' not registered!');
        }
      }
    } else {
      throw Error('showdown.subParser function first argument must be a string (the name of the subparser)');
    }
  };

  /**
   * Gets or registers an extension
   * @static
   * @param {string} name
   * @param {object|object[]|function=} ext
   * @returns {*}
   */
  showdown.extension = function (name, ext) {
    'use strict';

    if (!showdown.helper.isString(name)) {
      throw Error('Extension \'name\' must be a string');
    }

    name = showdown.helper.stdExtName(name);

    // Getter
    if (showdown.helper.isUndefined(ext)) {
      if (!extensions.hasOwnProperty(name)) {
        throw Error('Extension named ' + name + ' is not registered!');
      }
      return extensions[name];

      // Setter
    } else {
      // Expand extension if it's wrapped in a function
      if (typeof ext === 'function') {
        ext = ext();
      }

      // Ensure extension is an array
      if (!showdown.helper.isArray(ext)) {
        ext = [ext];
      }

      var validExtension = validate(ext, name);

      if (validExtension.valid) {
        extensions[name] = ext;
      } else {
        throw Error(validExtension.error);
      }
    }
  };

  /**
   * Gets all extensions registered
   * @returns {{}}
   */
  showdown.getAllExtensions = function () {
    'use strict';
    return extensions;
  };

  /**
   * Remove an extension
   * @param {string} name
   */
  showdown.removeExtension = function (name) {
    'use strict';
    delete extensions[name];
  };

  /**
   * Removes all extensions
   */
  showdown.resetExtensions = function () {
    'use strict';
    extensions = {};
  };

  /**
   * Validate extension
   * @param {array} extension
   * @param {string} name
   * @returns {{valid: boolean, error: string}}
   */
  function validate(extension, name) {
    'use strict';

    var errMsg = (name) ? 'Error in ' + name + ' extension->' : 'Error in unnamed extension',
      ret = {
        valid: true,
        error: ''
      };

    if (!showdown.helper.isArray(extension)) {
      extension = [extension];
    }

    for (var i = 0; i < extension.length; ++i) {
      var baseMsg = errMsg + ' sub-extension ' + i + ': ',
        ext = extension[i];
      if (typeof ext !== 'object') {
        ret.valid = false;
        ret.error = baseMsg + 'must be an object, but ' + typeof ext + ' given';
        return ret;
      }

      if (!showdown.helper.isString(ext.type)) {
        ret.valid = false;
        ret.error = baseMsg + 'property "type" must be a string, but ' + typeof ext.type + ' given';
        return ret;
      }

      var type = ext.type = ext.type.toLowerCase();

      // normalize extension type
      if (type === 'language') {
        type = ext.type = 'lang';
      }

      if (type === 'html') {
        type = ext.type = 'output';
      }

      if (type !== 'lang' && type !== 'output' && type !== 'listener') {
        ret.valid = false;
        ret.error = baseMsg + 'type ' + type + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"';
        return ret;
      }

      if (type === 'listener') {
        if (showdown.helper.isUndefined(ext.listeners)) {
          ret.valid = false;
          ret.error = baseMsg + '. Extensions of type "listener" must have a property called "listeners"';
          return ret;
        }
      } else {
        if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
          ret.valid = false;
          ret.error = baseMsg + type + ' extensions must define either a "regex" property or a "filter" method';
          return ret;
        }
      }

      if (ext.listeners) {
        if (typeof ext.listeners !== 'object') {
          ret.valid = false;
          ret.error = baseMsg + '"listeners" property must be an object but ' + typeof ext.listeners + ' given';
          return ret;
        }
        for (var ln in ext.listeners) {
          if (ext.listeners.hasOwnProperty(ln)) {
            if (typeof ext.listeners[ln] !== 'function') {
              ret.valid = false;
              ret.error = baseMsg + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + ln +
                ' must be a function but ' + typeof ext.listeners[ln] + ' given';
              return ret;
            }
          }
        }
      }

      if (ext.filter) {
        if (typeof ext.filter !== 'function') {
          ret.valid = false;
          ret.error = baseMsg + '"filter" must be a function, but ' + typeof ext.filter + ' given';
          return ret;
        }
      } else if (ext.regex) {
        if (showdown.helper.isString(ext.regex)) {
          ext.regex = new RegExp(ext.regex, 'g');
        }
        if (!(ext.regex instanceof RegExp)) {
          ret.valid = false;
          ret.error = baseMsg + '"regex" property must either be a string or a RegExp object, but ' + typeof ext.regex + ' given';
          return ret;
        }
        if (showdown.helper.isUndefined(ext.replace)) {
          ret.valid = false;
          ret.error = baseMsg + '"regex" extensions must implement a replace string or function';
          return ret;
        }
      }
    }
    return ret;
  }

  /**
   * Validate extension
   * @param {object} ext
   * @returns {boolean}
   */
  showdown.validateExtension = function (ext) {
    'use strict';

    var validateExtension = validate(ext, null);
    if (!validateExtension.valid) {
      console.warn(validateExtension.error);
      return false;
    }
    return true;
  };

  /**
   * showdownjs helper functions
   */

  if (!showdown.hasOwnProperty('helper')) {
    showdown.helper = {};
  }

  if (typeof this === 'undefined' && typeof window !== 'undefined') {
    showdown.helper.document = window.document;
  } else {
    if (typeof this.document === 'undefined' && typeof this.window === 'undefined') {
      var jsdom = require('jsdom');
      this.window = new jsdom.JSDOM('', {}).window; // jshint ignore:line
    }
    showdown.helper.document = this.window.document;
  }

  /**
   * Check if var is string
   * @static
   * @param {string} a
   * @returns {boolean}
   */
  showdown.helper.isString = function (a) {
    'use strict';
    return (typeof a === 'string' || a instanceof String);
  };

  /**
   * Check if var is a function
   * @static
   * @param {*} a
   * @returns {boolean}
   */
  showdown.helper.isFunction = function (a) {
    'use strict';
    var getType = {};
    return a && getType.toString.call(a) === '[object Function]';
  };

  /**
   * isArray helper function
   * @static
   * @param {*} a
   * @returns {boolean}
   */
  showdown.helper.isArray = function (a) {
    'use strict';
    return Array.isArray(a);
  };

  /**
   * Check if value is undefined
   * @static
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
   */
  showdown.helper.isUndefined = function (value) {
    'use strict';
    return typeof value === 'undefined';
  };

  /**
   * ForEach helper function
   * Iterates over Arrays and Objects (own properties only)
   * @static
   * @param {*} obj
   * @param {function} callback Accepts 3 params: 1. value, 2. key, 3. the original array/object
   */
  showdown.helper.forEach = function (obj, callback) {
    'use strict';
    // check if obj is defined
    if (showdown.helper.isUndefined(obj)) {
      throw new Error('obj param is required');
    }

    if (showdown.helper.isUndefined(callback)) {
      throw new Error('callback param is required');
    }

    if (!showdown.helper.isFunction(callback)) {
      throw new Error('callback param must be a function/closure');
    }

    if (typeof obj.forEach === 'function') {
      obj.forEach(callback);
    } else if (showdown.helper.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        callback(obj[i], i, obj);
      }
    } else if (typeof (obj) === 'object') {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          callback(obj[prop], prop, obj);
        }
      }
    } else {
      throw new Error('obj does not seem to be an array or an iterable object');
    }
  };

  /**
   * Standardidize extension name
   * @static
   * @param {string} s extension name
   * @returns {string}
   */
  showdown.helper.stdExtName = function (s) {
    'use strict';
    return s.replace(/[_?*+\/\\.^-]/g, '').replace(/\s/g, '').toLowerCase();
  };

  function escapeCharactersCallback(wholeMatch, m1) {
    'use strict';
    var charCodeToEscape = m1.charCodeAt(0);
    return '¨E' + charCodeToEscape + 'E';
  }

  /**
   * Callback used to escape characters when passing through String.replace
   * @static
   * @param {string} wholeMatch
   * @param {string} m1
   * @returns {string}
   */
  showdown.helper.escapeCharactersCallback = escapeCharactersCallback;

  /**
   * Escape characters in a string
   * @static
   * @param {string} text
   * @param {string} charsToEscape
   * @param {boolean} afterBackslash
   * @returns {string|void|*}
   */
  showdown.helper.escapeCharacters = function (text, charsToEscape, afterBackslash) {
    'use strict';
    // First we have to escape the escape characters so that
    // we can build a character class out of them
    var regexString = '([' + charsToEscape.replace(/([\[\]\\])/g, '\\$1') + '])';

    if (afterBackslash) {
      regexString = '\\\\' + regexString;
    }

    var regex = new RegExp(regexString, 'g');
    text = text.replace(regex, escapeCharactersCallback);

    return text;
  };

  var rgxFindMatchPos = function (str, left, right, flags) {
    'use strict';
    var f = flags || '',
      g = f.indexOf('g') > -1,
      x = new RegExp(left + '|' + right, 'g' + f.replace(/g/g, '')),
      l = new RegExp(left, f.replace(/g/g, '')),
      pos = [],
      t, s, m, start, end;

    do {
      t = 0;
      while ((m = x.exec(str))) {
        if (l.test(m[0])) {
          if (!(t++)) {
            s = x.lastIndex;
            start = s - m[0].length;
          }
        } else if (t) {
          if (!--t) {
            end = m.index + m[0].length;
            var obj = {
              left: { start: start, end: s },
              match: { start: s, end: m.index },
              right: { start: m.index, end: end },
              wholeMatch: { start: start, end: end }
            };
            pos.push(obj);
            if (!g) {
              return pos;
            }
          }
        }
      }
    } while (t && (x.lastIndex = s));

    return pos;
  };

  /**
   * matchRecursiveRegExp
   *
   * (c) 2007 Steven Levithan <stevenlevithan.com>
   * MIT License
   *
   * Accepts a string to search, a left and right format delimiter
   * as regex patterns, and optional regex flags. Returns an array
   * of matches, allowing nested instances of left/right delimiters.
   * Use the "g" flag to return all matches, otherwise only the
   * first is returned. Be careful to ensure that the left and
   * right format delimiters produce mutually exclusive matches.
   * Backreferences are not supported within the right delimiter
   * due to how it is internally combined with the left delimiter.
   * When matching strings whose format delimiters are unbalanced
   * to the left or right, the output is intentionally as a
   * conventional regex library with recursion support would
   * produce, e.g. "<<x>" and "<x>>" both produce ["x"] when using
   * "<" and ">" as the delimiters (both strings contain a single,
   * balanced instance of "<x>").
   *
   * examples:
   * matchRecursiveRegExp("test", "\\(", "\\)")
   * returns: []
   * matchRecursiveRegExp("<t<<e>><s>>t<>", "<", ">", "g")
   * returns: ["t<<e>><s>", ""]
   * matchRecursiveRegExp("<div id=\"x\">test</div>", "<div\\b[^>]*>", "</div>", "gi")
   * returns: ["test"]
   */
  showdown.helper.matchRecursiveRegExp = function (str, left, right, flags) {
    'use strict';

    var matchPos = rgxFindMatchPos(str, left, right, flags),
      results = [];

    for (var i = 0; i < matchPos.length; ++i) {
      results.push([
        str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
        str.slice(matchPos[i].match.start, matchPos[i].match.end),
        str.slice(matchPos[i].left.start, matchPos[i].left.end),
        str.slice(matchPos[i].right.start, matchPos[i].right.end)
      ]);
    }
    return results;
  };

  /**
   *
   * @param {string} str
   * @param {string|function} replacement
   * @param {string} left
   * @param {string} right
   * @param {string} flags
   * @returns {string}
   */
  showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {
    'use strict';

    if (!showdown.helper.isFunction(replacement)) {
      var repStr = replacement;
      replacement = function () {
        return repStr;
      };
    }

    var matchPos = rgxFindMatchPos(str, left, right, flags),
      finalStr = str,
      lng = matchPos.length;

    if (lng > 0) {
      var bits = [];
      if (matchPos[0].wholeMatch.start !== 0) {
        bits.push(str.slice(0, matchPos[0].wholeMatch.start));
      }
      for (var i = 0; i < lng; ++i) {
        bits.push(
          replacement(
            str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end),
            str.slice(matchPos[i].match.start, matchPos[i].match.end),
            str.slice(matchPos[i].left.start, matchPos[i].left.end),
            str.slice(matchPos[i].right.start, matchPos[i].right.end)
          )
        );
        if (i < lng - 1) {
          bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
        }
      }
      if (matchPos[lng - 1].wholeMatch.end < str.length) {
        bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
      }
      finalStr = bits.join('');
    }
    return finalStr;
  };

  /**
   * Returns the index within the passed String object of the first occurrence of the specified regex,
   * starting the search at fromIndex. Returns -1 if the value is not found.
   *
   * @param {string} str string to search
   * @param {RegExp} regex Regular expression to search
   * @param {int} [fromIndex = 0] Index to start the search
   * @returns {Number}
   * @throws InvalidArgumentError
   */
  showdown.helper.regexIndexOf = function (str, regex, fromIndex) {
    'use strict';
    if (!showdown.helper.isString(str)) {
      throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
    }
    if (!(regex instanceof RegExp)) {
      throw 'InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp';
    }
    var indexOf = str.substring(fromIndex || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (fromIndex || 0)) : indexOf;
  };

  /**
   * Splits the passed string object at the defined index, and returns an array composed of the two substrings
   * @param {string} str string to split
   * @param {int} index index to split string at
   * @returns {[string,string]}
   * @throws InvalidArgumentError
   */
  showdown.helper.splitAtIndex = function (str, index) {
    'use strict';
    if (!showdown.helper.isString(str)) {
      throw 'InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string';
    }
    return [str.substring(0, index), str.substring(index)];
  };

  /**
   * Obfuscate an e-mail address through the use of Character Entities,
   * transforming ASCII characters into their equivalent decimal or hex entities.
   *
   * Since it has a random component, subsequent calls to this function produce different results
   *
   * @param {string} mail
   * @param {string} seed
   * @returns {string}
   */
  showdown.helper.encodeEmailAddress = function (mail, seed) {
    'use strict';
    var encode = [
      function (ch) {
        return '&#' + ch.charCodeAt(0) + ';';
      },
      function (ch) {
        return '&#x' + ch.charCodeAt(0).toString(16) + ';';
      },
      function (ch) {
        return ch;
      }
    ];

    mail = mail.replace(/./g, function (ch) {
      if (ch === '@') {
        // this *must* be encoded. I insist.
        ch = encode[Math.floor(Math.random() * 2)](ch);
      } else {
        var r = Math.random();
        // roughly 10% raw, 45% hex, 45% dec
        ch = (
          r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch)
        );
      }
      return ch;
    });

    return mail;
  };

  /**
   * String.prototype.repeat polyfill
   *
   * @param {string} str
   * @param {int} count
   * @returns {string}
   */
  showdown.helper.repeat = function (str, count) {
    'use strict';
    // use built-in method if it's available
    if (!showdown.helper.isUndefined(String.prototype.repeat)) {
      return str.repeat(count);
    }
    str = '' + str;
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count === Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length === 0 || count === 0) {
      return '';
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    /*jshint bitwise: false*/
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    /*jshint bitwise: true*/
    var maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
      str += str;
      count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
  };

  /**
   * String.prototype.padEnd polyfill
   *
   * @param str
   * @param targetLength
   * @param padString
   * @returns {string}
   */
  showdown.helper.padEnd = function padEnd(str, targetLength, padString) {
    'use strict';
    /*jshint bitwise: false*/
    // eslint-disable-next-line space-infix-ops
    targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
    /*jshint bitwise: true*/
    padString = String(padString || ' ');
    if (str.length > targetLength) {
      return String(str);
    } else {
      targetLength = targetLength - str.length;
      if (targetLength > padString.length) {
        padString += showdown.helper.repeat(padString, targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return String(str) + padString.slice(0, targetLength);
    }
  };

  /**
   * Unescape HTML entities
   * @param txt
   * @returns {string}
   */
  showdown.helper.unescapeHTMLEntities = function (txt) {
    'use strict';

    return txt
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  };

  showdown.helper._hashHTMLSpan = function (html, globals) {
    return '¨C' + (globals.gHtmlSpans.push(html) - 1) + 'C';
  };

  /**
   * Prepends a base URL to relative paths.
   *
   * @param {string} baseUrl the base URL to prepend to a relative path
   * @param {string} url the path to modify, which may be relative
   * @returns {string} the full URL
   */
  showdown.helper.applyBaseUrl = function (baseUrl, url) {
    // Only prepend if given a base URL and the path is not absolute.
    if (baseUrl && !this.isAbsolutePath(url)) {
      var urlResolve = require('url').resolve;
      url = urlResolve(baseUrl, url);
    }

    return url;
  };

  /**
   * Checks if the given path is absolute.
   *
   * @param {string} path the path to test for absolution
   * @returns {boolean} `true` if the given path is absolute, else `false`
   */
  showdown.helper.isAbsolutePath = function (path) {
    // Absolute paths begin with '[protocol:]//' or '#' (anchors)
    return /(^([a-z]+:)?\/\/)|(^#)/i.test(path);
  };

  /**
   * Showdown's Event Object
   * @param {string} name Name of the event
   * @param {string} text Text
   * @param {{}} params optional. params of the event
   * @constructor
   */
  showdown.helper.Event = function (name, text, params) {
    'use strict';

    var regexp = params.regexp || null;
    var matches = params.matches || {};
    var options = params.options || {};
    var converter = params.converter || null;
    var globals = params.globals || {};

    /**
     * Get the name of the event
     * @returns {string}
     */
    this.getName = function () {
      return name;
    };

    this.getEventName = function () {
      return name;
    };

    this._stopExecution = false;

    this.parsedText = params.parsedText || null;

    this.getRegexp = function () {
      return regexp;
    };

    this.getOptions = function () {
      return options;
    };

    this.getConverter = function () {
      return converter;
    };

    this.getGlobals = function () {
      return globals;
    };

    this.getCapturedText = function () {
      return text;
    };

    this.getText = function () {
      return text;
    };

    this.setText = function (newText) {
      text = newText;
    };

    this.getMatches = function () {
      return matches;
    };

    this.setMatches = function (newMatches) {
      matches = newMatches;
    };

    this.preventDefault = function (bool) {
      this._stopExecution = !bool;
    };
  };

  /**
   * POLYFILLS
   */
  // use this instead of builtin is undefined for IE8 compatibility
  if (typeof (console) === 'undefined') {
    console = {
      warn: function (msg) {
        'use strict';
        alert(msg);
      },
      log: function (msg) {
        'use strict';
        alert(msg);
      },
      error: function (msg) {
        'use strict';
        throw msg;
      }
    };
  }

  /**
   * Common regexes.
   * We declare some common regexes to improve performance
   */
  showdown.helper.regexes = {
    asteriskDashTildeAndColon: /([*_:~])/g,
    asteriskDashAndTilde: /([*_~])/g
  };

  /**
   * EMOJIS LIST
   */
  showdown.helper.emojis = {
    '100': '\ud83d\udcaf',
    '1234': '\ud83d\udd22',
    '+1': '\ud83d\udc4d',
    '-1': '\ud83d\udc4e',
    '1st_place_medal': '\ud83e\udd47',
    '2nd_place_medal': '\ud83e\udd48',
    '3rd_place_medal': '\ud83e\udd49',
    '8ball': '\ud83c\udfb1',
    'a': '\ud83c\udd70\ufe0f',
    'ab': '\ud83c\udd8e',
    'abacus': '\ud83e\uddee',
    'abc': '\ud83d\udd24',
    'abcd': '\ud83d\udd21',
    'accept': '\ud83c\ude51',
    'adhesive_bandage': '\ud83e\ude79',
    'adult': '\ud83e\uddd1',
    'aerial_tramway': '\ud83d\udea1',
    'afghanistan': '\ud83c\udde6\ud83c\uddeb',
    'airplane': '\u2708\ufe0f',
    'aland_islands': '\ud83c\udde6\ud83c\uddfd',
    'alarm_clock': '\u23f0',
    'albania': '\ud83c\udde6\ud83c\uddf1',
    'alembic': '\u2697\ufe0f',
    'algeria': '\ud83c\udde9\ud83c\uddff',
    'alien': '\ud83d\udc7d',
    'ambulance': '\ud83d\ude91',
    'american_samoa': '\ud83c\udde6\ud83c\uddf8',
    'amphora': '\ud83c\udffa',
    'anchor': '\u2693',
    'andorra': '\ud83c\udde6\ud83c\udde9',
    'angel': '\ud83d\udc7c',
    'anger': '\ud83d\udca2',
    'angola': '\ud83c\udde6\ud83c\uddf4',
    'angry': '\ud83d\ude20',
    'anguilla': '\ud83c\udde6\ud83c\uddee',
    'anguished': '\ud83d\ude27',
    'ant': '\ud83d\udc1c',
    'antarctica': '\ud83c\udde6\ud83c\uddf6',
    'antigua_barbuda': '\ud83c\udde6\ud83c\uddec',
    'apple': '\ud83c\udf4e',
    'aquarius': '\u2652',
    'argentina': '\ud83c\udde6\ud83c\uddf7',
    'aries': '\u2648',
    'armenia': '\ud83c\udde6\ud83c\uddf2',
    'arrow_backward': '\u25c0\ufe0f',
    'arrow_double_down': '\u23ec',
    'arrow_double_up': '\u23eb',
    'arrow_down': '\u2b07\ufe0f',
    'arrow_down_small': '\ud83d\udd3d',
    'arrow_forward': '\u25b6\ufe0f',
    'arrow_heading_down': '\u2935\ufe0f',
    'arrow_heading_up': '\u2934\ufe0f',
    'arrow_left': '\u2b05\ufe0f',
    'arrow_lower_left': '\u2199\ufe0f',
    'arrow_lower_right': '\u2198\ufe0f',
    'arrow_right': '\u27a1\ufe0f',
    'arrow_right_hook': '\u21aa\ufe0f',
    'arrow_up': '\u2b06\ufe0f',
    'arrow_up_down': '\u2195\ufe0f',
    'arrow_up_small': '\ud83d\udd3c',
    'arrow_upper_left': '\u2196\ufe0f',
    'arrow_upper_right': '\u2197\ufe0f',
    'arrows_clockwise': '\ud83d\udd03',
    'arrows_counterclockwise': '\ud83d\udd04',
    'art': '\ud83c\udfa8',
    'articulated_lorry': '\ud83d\ude9b',
    'artificial_satellite': '\ud83d\udef0\ufe0f',
    'artist': '\ud83e\uddd1\u200d\ud83c\udfa8',
    'aruba': '\ud83c\udde6\ud83c\uddfc',
    'ascension_island': '\ud83c\udde6\ud83c\udde8',
    'asterisk': '*\ufe0f\u20e3',
    'astonished': '\ud83d\ude32',
    'astronaut': '\ud83e\uddd1\u200d\ud83d\ude80',
    'athletic_shoe': '\ud83d\udc5f',
    'atm': '\ud83c\udfe7',
    'atom_symbol': '\u269b\ufe0f',
    'australia': '\ud83c\udde6\ud83c\uddfa',
    'austria': '\ud83c\udde6\ud83c\uddf9',
    'auto_rickshaw': '\ud83d\udefa',
    'avocado': '\ud83e\udd51',
    'axe': '\ud83e\ude93',
    'azerbaijan': '\ud83c\udde6\ud83c\uddff',
    'b': '\ud83c\udd71\ufe0f',
    'baby': '\ud83d\udc76',
    'baby_bottle': '\ud83c\udf7c',
    'baby_chick': '\ud83d\udc24',
    'baby_symbol': '\ud83d\udebc',
    'back': '\ud83d\udd19',
    'bacon': '\ud83e\udd53',
    'badger': '\ud83e\udda1',
    'badminton': '\ud83c\udff8',
    'bagel': '\ud83e\udd6f',
    'baggage_claim': '\ud83d\udec4',
    'baguette_bread': '\ud83e\udd56',
    'bahamas': '\ud83c\udde7\ud83c\uddf8',
    'bahrain': '\ud83c\udde7\ud83c\udded',
    'balance_scale': '\u2696\ufe0f',
    'bald_man': '\ud83d\udc68\u200d\ud83e\uddb2',
    'bald_woman': '\ud83d\udc69\u200d\ud83e\uddb2',
    'ballet_shoes': '\ud83e\ude70',
    'balloon': '\ud83c\udf88',
    'ballot_box': '\ud83d\uddf3\ufe0f',
    'ballot_box_with_check': '\u2611\ufe0f',
    'bamboo': '\ud83c\udf8d',
    'banana': '\ud83c\udf4c',
    'bangbang': '\u203c\ufe0f',
    'bangladesh': '\ud83c\udde7\ud83c\udde9',
    'banjo': '\ud83e\ude95',
    'bank': '\ud83c\udfe6',
    'bar_chart': '\ud83d\udcca',
    'barbados': '\ud83c\udde7\ud83c\udde7',
    'barber': '\ud83d\udc88',
    'baseball': '\u26be',
    'basket': '\ud83e\uddfa',
    'basketball': '\ud83c\udfc0',
    'basketball_man': '\u26f9\ufe0f\u200d\u2642\ufe0f',
    'basketball_woman': '\u26f9\ufe0f\u200d\u2640\ufe0f',
    'bat': '\ud83e\udd87',
    'bath': '\ud83d\udec0',
    'bathtub': '\ud83d\udec1',
    'battery': '\ud83d\udd0b',
    'beach_umbrella': '\ud83c\udfd6\ufe0f',
    'bear': '\ud83d\udc3b',
    'bearded_person': '\ud83e\uddd4',
    'bed': '\ud83d\udecf\ufe0f',
    'bee': '\ud83d\udc1d',
    'beer': '\ud83c\udf7a',
    'beers': '\ud83c\udf7b',
    'beetle': '\ud83d\udc1e',
    'beginner': '\ud83d\udd30',
    'belarus': '\ud83c\udde7\ud83c\uddfe',
    'belgium': '\ud83c\udde7\ud83c\uddea',
    'belize': '\ud83c\udde7\ud83c\uddff',
    'bell': '\ud83d\udd14',
    'bellhop_bell': '\ud83d\udece\ufe0f',
    'benin': '\ud83c\udde7\ud83c\uddef',
    'bento': '\ud83c\udf71',
    'bermuda': '\ud83c\udde7\ud83c\uddf2',
    'beverage_box': '\ud83e\uddc3',
    'bhutan': '\ud83c\udde7\ud83c\uddf9',
    'bicyclist': '\ud83d\udeb4',
    'bike': '\ud83d\udeb2',
    'biking_man': '\ud83d\udeb4\u200d\u2642\ufe0f',
    'biking_woman': '\ud83d\udeb4\u200d\u2640\ufe0f',
    'bikini': '\ud83d\udc59',
    'billed_cap': '\ud83e\udde2',
    'biohazard': '\u2623\ufe0f',
    'bird': '\ud83d\udc26',
    'birthday': '\ud83c\udf82',
    'black_circle': '\u26ab',
    'black_flag': '\ud83c\udff4',
    'black_heart': '\ud83d\udda4',
    'black_joker': '\ud83c\udccf',
    'black_large_square': '\u2b1b',
    'black_medium_small_square': '\u25fe',
    'black_medium_square': '\u25fc\ufe0f',
    'black_nib': '\u2712\ufe0f',
    'black_small_square': '\u25aa\ufe0f',
    'black_square_button': '\ud83d\udd32',
    'blond_haired_man': '\ud83d\udc71\u200d\u2642\ufe0f',
    'blond_haired_person': '\ud83d\udc71',
    'blond_haired_woman': '\ud83d\udc71\u200d\u2640\ufe0f',
    'blonde_woman': '\ud83d\udc71\u200d\u2640\ufe0f',
    'blossom': '\ud83c\udf3c',
    'blowfish': '\ud83d\udc21',
    'blue_book': '\ud83d\udcd8',
    'blue_car': '\ud83d\ude99',
    'blue_heart': '\ud83d\udc99',
    'blue_square': '\ud83d\udfe6',
    'blush': '\ud83d\ude0a',
    'boar': '\ud83d\udc17',
    'boat': '\u26f5',
    'bolivia': '\ud83c\udde7\ud83c\uddf4',
    'bomb': '\ud83d\udca3',
    'bone': '\ud83e\uddb4',
    'book': '\ud83d\udcd6',
    'bookmark': '\ud83d\udd16',
    'bookmark_tabs': '\ud83d\udcd1',
    'books': '\ud83d\udcda',
    'boom': '\ud83d\udca5',
    'boot': '\ud83d\udc62',
    'bosnia_herzegovina': '\ud83c\udde7\ud83c\udde6',
    'botswana': '\ud83c\udde7\ud83c\uddfc',
    'bouncing_ball_man': '\u26f9\ufe0f\u200d\u2642\ufe0f',
    'bouncing_ball_person': '\u26f9\ufe0f',
    'bouncing_ball_woman': '\u26f9\ufe0f\u200d\u2640\ufe0f',
    'bouquet': '\ud83d\udc90',
    'bouvet_island': '\ud83c\udde7\ud83c\uddfb',
    'bow': '\ud83d\ude47',
    'bow_and_arrow': '\ud83c\udff9',
    'bowing_man': '\ud83d\ude47\u200d\u2642\ufe0f',
    'bowing_woman': '\ud83d\ude47\u200d\u2640\ufe0f',
    'bowl_with_spoon': '\ud83e\udd63',
    'bowling': '\ud83c\udfb3',
    'boxing_glove': '\ud83e\udd4a',
    'boy': '\ud83d\udc66',
    'brain': '\ud83e\udde0',
    'brazil': '\ud83c\udde7\ud83c\uddf7',
    'bread': '\ud83c\udf5e',
    'breast_feeding': '\ud83e\udd31',
    'bricks': '\ud83e\uddf1',
    'bride_with_veil': '\ud83d\udc70',
    'bridge_at_night': '\ud83c\udf09',
    'briefcase': '\ud83d\udcbc',
    'british_indian_ocean_territory': '\ud83c\uddee\ud83c\uddf4',
    'british_virgin_islands': '\ud83c\uddfb\ud83c\uddec',
    'broccoli': '\ud83e\udd66',
    'broken_heart': '\ud83d\udc94',
    'broom': '\ud83e\uddf9',
    'brown_circle': '\ud83d\udfe4',
    'brown_heart': '\ud83e\udd0e',
    'brown_square': '\ud83d\udfeb',
    'brunei': '\ud83c\udde7\ud83c\uddf3',
    'bug': '\ud83d\udc1b',
    'building_construction': '\ud83c\udfd7\ufe0f',
    'bulb': '\ud83d\udca1',
    'bulgaria': '\ud83c\udde7\ud83c\uddec',
    'bullettrain_front': '\ud83d\ude85',
    'bullettrain_side': '\ud83d\ude84',
    'burkina_faso': '\ud83c\udde7\ud83c\uddeb',
    'burrito': '\ud83c\udf2f',
    'burundi': '\ud83c\udde7\ud83c\uddee',
    'bus': '\ud83d\ude8c',
    'business_suit_levitating': '\ud83d\udd74\ufe0f',
    'busstop': '\ud83d\ude8f',
    'bust_in_silhouette': '\ud83d\udc64',
    'busts_in_silhouette': '\ud83d\udc65',
    'butter': '\ud83e\uddc8',
    'butterfly': '\ud83e\udd8b',
    'cactus': '\ud83c\udf35',
    'cake': '\ud83c\udf70',
    'calendar': '\ud83d\udcc6',
    'call_me_hand': '\ud83e\udd19',
    'calling': '\ud83d\udcf2',
    'cambodia': '\ud83c\uddf0\ud83c\udded',
    'camel': '\ud83d\udc2b',
    'camera': '\ud83d\udcf7',
    'camera_flash': '\ud83d\udcf8',
    'cameroon': '\ud83c\udde8\ud83c\uddf2',
    'camping': '\ud83c\udfd5\ufe0f',
    'canada': '\ud83c\udde8\ud83c\udde6',
    'canary_islands': '\ud83c\uddee\ud83c\udde8',
    'cancer': '\u264b',
    'candle': '\ud83d\udd6f\ufe0f',
    'candy': '\ud83c\udf6c',
    'canned_food': '\ud83e\udd6b',
    'canoe': '\ud83d\udef6',
    'cape_verde': '\ud83c\udde8\ud83c\uddfb',
    'capital_abcd': '\ud83d\udd20',
    'capricorn': '\u2651',
    'car': '\ud83d\ude97',
    'card_file_box': '\ud83d\uddc3\ufe0f',
    'card_index': '\ud83d\udcc7',
    'card_index_dividers': '\ud83d\uddc2\ufe0f',
    'caribbean_netherlands': '\ud83c\udde7\ud83c\uddf6',
    'carousel_horse': '\ud83c\udfa0',
    'carrot': '\ud83e\udd55',
    'cartwheeling': '\ud83e\udd38',
    'cat': '\ud83d\udc31',
    'cat2': '\ud83d\udc08',
    'cayman_islands': '\ud83c\uddf0\ud83c\uddfe',
    'cd': '\ud83d\udcbf',
    'central_african_republic': '\ud83c\udde8\ud83c\uddeb',
    'ceuta_melilla': '\ud83c\uddea\ud83c\udde6',
    'chad': '\ud83c\uddf9\ud83c\udde9',
    'chains': '\u26d3\ufe0f',
    'chair': '\ud83e\ude91',
    'champagne': '\ud83c\udf7e',
    'chart': '\ud83d\udcb9',
    'chart_with_downwards_trend': '\ud83d\udcc9',
    'chart_with_upwards_trend': '\ud83d\udcc8',
    'checkered_flag': '\ud83c\udfc1',
    'cheese': '\ud83e\uddc0',
    'cherries': '\ud83c\udf52',
    'cherry_blossom': '\ud83c\udf38',
    'chess_pawn': '\u265f\ufe0f',
    'chestnut': '\ud83c\udf30',
    'chicken': '\ud83d\udc14',
    'child': '\ud83e\uddd2',
    'children_crossing': '\ud83d\udeb8',
    'chile': '\ud83c\udde8\ud83c\uddf1',
    'chipmunk': '\ud83d\udc3f\ufe0f',
    'chocolate_bar': '\ud83c\udf6b',
    'chopsticks': '\ud83e\udd62',
    'christmas_island': '\ud83c\udde8\ud83c\uddfd',
    'christmas_tree': '\ud83c\udf84',
    'church': '\u26ea',
    'cinema': '\ud83c\udfa6',
    'circus_tent': '\ud83c\udfaa',
    'city_sunrise': '\ud83c\udf07',
    'city_sunset': '\ud83c\udf06',
    'cityscape': '\ud83c\udfd9\ufe0f',
    'cl': '\ud83c\udd91',
    'clamp': '\ud83d\udddc\ufe0f',
    'clap': '\ud83d\udc4f',
    'clapper': '\ud83c\udfac',
    'classical_building': '\ud83c\udfdb\ufe0f',
    'climbing': '\ud83e\uddd7',
    'climbing_man': '\ud83e\uddd7\u200d\u2642\ufe0f',
    'climbing_woman': '\ud83e\uddd7\u200d\u2640\ufe0f',
    'clinking_glasses': '\ud83e\udd42',
    'clipboard': '\ud83d\udccb',
    'clipperton_island': '\ud83c\udde8\ud83c\uddf5',
    'clock1': '\ud83d\udd50',
    'clock10': '\ud83d\udd59',
    'clock1030': '\ud83d\udd65',
    'clock11': '\ud83d\udd5a',
    'clock1130': '\ud83d\udd66',
    'clock12': '\ud83d\udd5b',
    'clock1230': '\ud83d\udd67',
    'clock130': '\ud83d\udd5c',
    'clock2': '\ud83d\udd51',
    'clock230': '\ud83d\udd5d',
    'clock3': '\ud83d\udd52',
    'clock330': '\ud83d\udd5e',
    'clock4': '\ud83d\udd53',
    'clock430': '\ud83d\udd5f',
    'clock5': '\ud83d\udd54',
    'clock530': '\ud83d\udd60',
    'clock6': '\ud83d\udd55',
    'clock630': '\ud83d\udd61',
    'clock7': '\ud83d\udd56',
    'clock730': '\ud83d\udd62',
    'clock8': '\ud83d\udd57',
    'clock830': '\ud83d\udd63',
    'clock9': '\ud83d\udd58',
    'clock930': '\ud83d\udd64',
    'closed_book': '\ud83d\udcd5',
    'closed_lock_with_key': '\ud83d\udd10',
    'closed_umbrella': '\ud83c\udf02',
    'cloud': '\u2601\ufe0f',
    'cloud_with_lightning': '\ud83c\udf29\ufe0f',
    'cloud_with_lightning_and_rain': '\u26c8\ufe0f',
    'cloud_with_rain': '\ud83c\udf27\ufe0f',
    'cloud_with_snow': '\ud83c\udf28\ufe0f',
    'clown_face': '\ud83e\udd21',
    'clubs': '\u2663\ufe0f',
    'cn': '\ud83c\udde8\ud83c\uddf3',
    'coat': '\ud83e\udde5',
    'cocktail': '\ud83c\udf78',
    'coconut': '\ud83e\udd65',
    'cocos_islands': '\ud83c\udde8\ud83c\udde8',
    'coffee': '\u2615',
    'coffin': '\u26b0\ufe0f',
    'cold_face': '\ud83e\udd76',
    'cold_sweat': '\ud83d\ude30',
    'collision': '\ud83d\udca5',
    'colombia': '\ud83c\udde8\ud83c\uddf4',
    'comet': '\u2604\ufe0f',
    'comoros': '\ud83c\uddf0\ud83c\uddf2',
    'compass': '\ud83e\udded',
    'computer': '\ud83d\udcbb',
    'computer_mouse': '\ud83d\uddb1\ufe0f',
    'confetti_ball': '\ud83c\udf8a',
    'confounded': '\ud83d\ude16',
    'confused': '\ud83d\ude15',
    'congo_brazzaville': '\ud83c\udde8\ud83c\uddec',
    'congo_kinshasa': '\ud83c\udde8\ud83c\udde9',
    'congratulations': '\u3297\ufe0f',
    'construction': '\ud83d\udea7',
    'construction_worker': '\ud83d\udc77',
    'construction_worker_man': '\ud83d\udc77\u200d\u2642\ufe0f',
    'construction_worker_woman': '\ud83d\udc77\u200d\u2640\ufe0f',
    'control_knobs': '\ud83c\udf9b\ufe0f',
    'convenience_store': '\ud83c\udfea',
    'cook': '\ud83e\uddd1\u200d\ud83c\udf73',
    'cook_islands': '\ud83c\udde8\ud83c\uddf0',
    'cookie': '\ud83c\udf6a',
    'cool': '\ud83c\udd92',
    'cop': '\ud83d\udc6e',
    'copyright': '\u00a9\ufe0f',
    'corn': '\ud83c\udf3d',
    'costa_rica': '\ud83c\udde8\ud83c\uddf7',
    'cote_divoire': '\ud83c\udde8\ud83c\uddee',
    'couch_and_lamp': '\ud83d\udecb\ufe0f',
    'couple': '\ud83d\udc6b',
    'couple_with_heart': '\ud83d\udc91',
    'couple_with_heart_man_man': '\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68',
    'couple_with_heart_woman_man': '\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc68',
    'couple_with_heart_woman_woman': '\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc69',
    'couplekiss': '\ud83d\udc8f',
    'couplekiss_man_man': '\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68',
    'couplekiss_man_woman': '\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68',
    'couplekiss_woman_woman': '\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69',
    'cow': '\ud83d\udc2e',
    'cow2': '\ud83d\udc04',
    'cowboy_hat_face': '\ud83e\udd20',
    'crab': '\ud83e\udd80',
    'crayon': '\ud83d\udd8d\ufe0f',
    'credit_card': '\ud83d\udcb3',
    'crescent_moon': '\ud83c\udf19',
    'cricket': '\ud83e\udd97',
    'cricket_game': '\ud83c\udfcf',
    'croatia': '\ud83c\udded\ud83c\uddf7',
    'crocodile': '\ud83d\udc0a',
    'croissant': '\ud83e\udd50',
    'crossed_fingers': '\ud83e\udd1e',
    'crossed_flags': '\ud83c\udf8c',
    'crossed_swords': '\u2694\ufe0f',
    'crown': '\ud83d\udc51',
    'cry': '\ud83d\ude22',
    'crying_cat_face': '\ud83d\ude3f',
    'crystal_ball': '\ud83d\udd2e',
    'cuba': '\ud83c\udde8\ud83c\uddfa',
    'cucumber': '\ud83e\udd52',
    'cup_with_straw': '\ud83e\udd64',
    'cupcake': '\ud83e\uddc1',
    'cupid': '\ud83d\udc98',
    'curacao': '\ud83c\udde8\ud83c\uddfc',
    'curling_stone': '\ud83e\udd4c',
    'curly_haired_man': '\ud83d\udc68\u200d\ud83e\uddb1',
    'curly_haired_woman': '\ud83d\udc69\u200d\ud83e\uddb1',
    'curly_loop': '\u27b0',
    'currency_exchange': '\ud83d\udcb1',
    'curry': '\ud83c\udf5b',
    'cursing_face': '\ud83e\udd2c',
    'custard': '\ud83c\udf6e',
    'customs': '\ud83d\udec3',
    'cut_of_meat': '\ud83e\udd69',
    'cyclone': '\ud83c\udf00',
    'cyprus': '\ud83c\udde8\ud83c\uddfe',
    'czech_republic': '\ud83c\udde8\ud83c\uddff',
    'dagger': '\ud83d\udde1\ufe0f',
    'dancer': '\ud83d\udc83',
    'dancers': '\ud83d\udc6f',
    'dancing_men': '\ud83d\udc6f\u200d\u2642\ufe0f',
    'dancing_women': '\ud83d\udc6f\u200d\u2640\ufe0f',
    'dango': '\ud83c\udf61',
    'dark_sunglasses': '\ud83d\udd76\ufe0f',
    'dart': '\ud83c\udfaf',
    'dash': '\ud83d\udca8',
    'date': '\ud83d\udcc5',
    'de': '\ud83c\udde9\ud83c\uddea',
    'deaf_man': '\ud83e\uddcf\u200d\u2642\ufe0f',
    'deaf_person': '\ud83e\uddcf',
    'deaf_woman': '\ud83e\uddcf\u200d\u2640\ufe0f',
    'deciduous_tree': '\ud83c\udf33',
    'deer': '\ud83e\udd8c',
    'denmark': '\ud83c\udde9\ud83c\uddf0',
    'department_store': '\ud83c\udfec',
    'derelict_house': '\ud83c\udfda\ufe0f',
    'desert': '\ud83c\udfdc\ufe0f',
    'desert_island': '\ud83c\udfdd\ufe0f',
    'desktop_computer': '\ud83d\udda5\ufe0f',
    'detective': '\ud83d\udd75\ufe0f',
    'diamond_shape_with_a_dot_inside': '\ud83d\udca0',
    'diamonds': '\u2666\ufe0f',
    'diego_garcia': '\ud83c\udde9\ud83c\uddec',
    'disappointed': '\ud83d\ude1e',
    'disappointed_relieved': '\ud83d\ude25',
    'diving_mask': '\ud83e\udd3f',
    'diya_lamp': '\ud83e\ude94',
    'dizzy': '\ud83d\udcab',
    'dizzy_face': '\ud83d\ude35',
    'djibouti': '\ud83c\udde9\ud83c\uddef',
    'dna': '\ud83e\uddec',
    'do_not_litter': '\ud83d\udeaf',
    'dog': '\ud83d\udc36',
    'dog2': '\ud83d\udc15',
    'dollar': '\ud83d\udcb5',
    'dolls': '\ud83c\udf8e',
    'dolphin': '\ud83d\udc2c',
    'dominica': '\ud83c\udde9\ud83c\uddf2',
    'dominican_republic': '\ud83c\udde9\ud83c\uddf4',
    'door': '\ud83d\udeaa',
    'doughnut': '\ud83c\udf69',
    'dove': '\ud83d\udd4a\ufe0f',
    'dragon': '\ud83d\udc09',
    'dragon_face': '\ud83d\udc32',
    'dress': '\ud83d\udc57',
    'dromedary_camel': '\ud83d\udc2a',
    'drooling_face': '\ud83e\udd24',
    'drop_of_blood': '\ud83e\ude78',
    'droplet': '\ud83d\udca7',
    'drum': '\ud83e\udd41',
    'duck': '\ud83e\udd86',
    'dumpling': '\ud83e\udd5f',
    'dvd': '\ud83d\udcc0',
    'e-mail': '\ud83d\udce7',
    'eagle': '\ud83e\udd85',
    'ear': '\ud83d\udc42',
    'ear_of_rice': '\ud83c\udf3e',
    'ear_with_hearing_aid': '\ud83e\uddbb',
    'earth_africa': '\ud83c\udf0d',
    'earth_americas': '\ud83c\udf0e',
    'earth_asia': '\ud83c\udf0f',
    'ecuador': '\ud83c\uddea\ud83c\udde8',
    'egg': '\ud83e\udd5a',
    'eggplant': '\ud83c\udf46',
    'egypt': '\ud83c\uddea\ud83c\uddec',
    'eight': '8\ufe0f\u20e3',
    'eight_pointed_black_star': '\u2734\ufe0f',
    'eight_spoked_asterisk': '\u2733\ufe0f',
    'eject_button': '\u23cf\ufe0f',
    'el_salvador': '\ud83c\uddf8\ud83c\uddfb',
    'electric_plug': '\ud83d\udd0c',
    'elephant': '\ud83d\udc18',
    'elf': '\ud83e\udddd',
    'elf_man': '\ud83e\udddd\u200d\u2642\ufe0f',
    'elf_woman': '\ud83e\udddd\u200d\u2640\ufe0f',
    'email': '\u2709\ufe0f',
    'end': '\ud83d\udd1a',
    'england': '\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f',
    'envelope': '\u2709\ufe0f',
    'envelope_with_arrow': '\ud83d\udce9',
    'equatorial_guinea': '\ud83c\uddec\ud83c\uddf6',
    'eritrea': '\ud83c\uddea\ud83c\uddf7',
    'es': '\ud83c\uddea\ud83c\uddf8',
    'estonia': '\ud83c\uddea\ud83c\uddea',
    'ethiopia': '\ud83c\uddea\ud83c\uddf9',
    'eu': '\ud83c\uddea\ud83c\uddfa',
    'euro': '\ud83d\udcb6',
    'european_castle': '\ud83c\udff0',
    'european_post_office': '\ud83c\udfe4',
    'european_union': '\ud83c\uddea\ud83c\uddfa',
    'evergreen_tree': '\ud83c\udf32',
    'exclamation': '\u2757',
    'exploding_head': '\ud83e\udd2f',
    'expressionless': '\ud83d\ude11',
    'eye': '\ud83d\udc41\ufe0f',
    'eye_speech_bubble': '\ud83d\udc41\ufe0f\u200d\ud83d\udde8\ufe0f',
    'eyeglasses': '\ud83d\udc53',
    'eyes': '\ud83d\udc40',
    'face_with_head_bandage': '\ud83e\udd15',
    'face_with_thermometer': '\ud83e\udd12',
    'facepalm': '\ud83e\udd26',
    'facepunch': '\ud83d\udc4a',
    'factory': '\ud83c\udfed',
    'factory_worker': '\ud83e\uddd1\u200d\ud83c\udfed',
    'fairy': '\ud83e\uddda',
    'fairy_man': '\ud83e\uddda\u200d\u2642\ufe0f',
    'fairy_woman': '\ud83e\uddda\u200d\u2640\ufe0f',
    'falafel': '\ud83e\uddc6',
    'falkland_islands': '\ud83c\uddeb\ud83c\uddf0',
    'fallen_leaf': '\ud83c\udf42',
    'family': '\ud83d\udc6a',
    'family_man_boy': '\ud83d\udc68\u200d\ud83d\udc66',
    'family_man_boy_boy': '\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66',
    'family_man_girl': '\ud83d\udc68\u200d\ud83d\udc67',
    'family_man_girl_boy': '\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc66',
    'family_man_girl_girl': '\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc67',
    'family_man_man_boy': '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66',
    'family_man_man_boy_boy': '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66',
    'family_man_man_girl': '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67',
    'family_man_man_girl_boy': '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc66',
    'family_man_man_girl_girl': '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc67',
    'family_man_woman_boy': '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66',
    'family_man_woman_boy_boy': '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66',
    'family_man_woman_girl': '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67',
    'family_man_woman_girl_boy': '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
    'family_man_woman_girl_girl': '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67',
    'family_woman_boy': '\ud83d\udc69\u200d\ud83d\udc66',
    'family_woman_boy_boy': '\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66',
    'family_woman_girl': '\ud83d\udc69\u200d\ud83d\udc67',
    'family_woman_girl_boy': '\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
    'family_woman_girl_girl': '\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67',
    'family_woman_woman_boy': '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66',
    'family_woman_woman_boy_boy': '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66',
    'family_woman_woman_girl': '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67',
    'family_woman_woman_girl_boy': '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
    'family_woman_woman_girl_girl': '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67',
    'farmer': '\ud83e\uddd1\u200d\ud83c\udf3e',
    'faroe_islands': '\ud83c\uddeb\ud83c\uddf4',
    'fast_forward': '\u23e9',
    'fax': '\ud83d\udce0',
    'fearful': '\ud83d\ude28',
    'feet': '\ud83d\udc3e',
    'female_detective': '\ud83d\udd75\ufe0f\u200d\u2640\ufe0f',
    'female_sign': '\u2640\ufe0f',
    'ferris_wheel': '\ud83c\udfa1',
    'ferry': '\u26f4\ufe0f',
    'field_hockey': '\ud83c\udfd1',
    'fiji': '\ud83c\uddeb\ud83c\uddef',
    'file_cabinet': '\ud83d\uddc4\ufe0f',
    'file_folder': '\ud83d\udcc1',
    'film_projector': '\ud83d\udcfd\ufe0f',
    'film_strip': '\ud83c\udf9e\ufe0f',
    'finland': '\ud83c\uddeb\ud83c\uddee',
    'fire': '\ud83d\udd25',
    'fire_engine': '\ud83d\ude92',
    'fire_extinguisher': '\ud83e\uddef',
    'firecracker': '\ud83e\udde8',
    'firefighter': '\ud83e\uddd1\u200d\ud83d\ude92',
    'fireworks': '\ud83c\udf86',
    'first_quarter_moon': '\ud83c\udf13',
    'first_quarter_moon_with_face': '\ud83c\udf1b',
    'fish': '\ud83d\udc1f',
    'fish_cake': '\ud83c\udf65',
    'fishing_pole_and_fish': '\ud83c\udfa3',
    'fist': '\u270a',
    'fist_left': '\ud83e\udd1b',
    'fist_oncoming': '\ud83d\udc4a',
    'fist_raised': '\u270a',
    'fist_right': '\ud83e\udd1c',
    'five': '5\ufe0f\u20e3',
    'flags': '\ud83c\udf8f',
    'flamingo': '\ud83e\udda9',
    'flashlight': '\ud83d\udd26',
    'flat_shoe': '\ud83e\udd7f',
    'fleur_de_lis': '\u269c\ufe0f',
    'flight_arrival': '\ud83d\udeec',
    'flight_departure': '\ud83d\udeeb',
    'flipper': '\ud83d\udc2c',
    'floppy_disk': '\ud83d\udcbe',
    'flower_playing_cards': '\ud83c\udfb4',
    'flushed': '\ud83d\ude33',
    'flying_disc': '\ud83e\udd4f',
    'flying_saucer': '\ud83d\udef8',
    'fog': '\ud83c\udf2b\ufe0f',
    'foggy': '\ud83c\udf01',
    'foot': '\ud83e\uddb6',
    'football': '\ud83c\udfc8',
    'footprints': '\ud83d\udc63',
    'fork_and_knife': '\ud83c\udf74',
    'fortune_cookie': '\ud83e\udd60',
    'fountain': '\u26f2',
    'fountain_pen': '\ud83d\udd8b\ufe0f',
    'four': '4\ufe0f\u20e3',
    'four_leaf_clover': '\ud83c\udf40',
    'fox_face': '\ud83e\udd8a',
    'fr': '\ud83c\uddeb\ud83c\uddf7',
    'framed_picture': '\ud83d\uddbc\ufe0f',
    'free': '\ud83c\udd93',
    'french_guiana': '\ud83c\uddec\ud83c\uddeb',
    'french_polynesia': '\ud83c\uddf5\ud83c\uddeb',
    'french_southern_territories': '\ud83c\uddf9\ud83c\uddeb',
    'fried_egg': '\ud83c\udf73',
    'fried_shrimp': '\ud83c\udf64',
    'fries': '\ud83c\udf5f',
    'frog': '\ud83d\udc38',
    'frowning': '\ud83d\ude26',
    'frowning_face': '\u2639\ufe0f',
    'frowning_man': '\ud83d\ude4d\u200d\u2642\ufe0f',
    'frowning_person': '\ud83d\ude4d',
    'frowning_woman': '\ud83d\ude4d\u200d\u2640\ufe0f',
    'fu': '\ud83d\udd95',
    'fuelpump': '\u26fd',
    'full_moon': '\ud83c\udf15',
    'full_moon_with_face': '\ud83c\udf1d',
    'funeral_urn': '\u26b1\ufe0f',
    'gabon': '\ud83c\uddec\ud83c\udde6',
    'gambia': '\ud83c\uddec\ud83c\uddf2',
    'game_die': '\ud83c\udfb2',
    'garlic': '\ud83e\uddc4',
    'gb': '\ud83c\uddec\ud83c\udde7',
    'gear': '\u2699\ufe0f',
    'gem': '\ud83d\udc8e',
    'gemini': '\u264a',
    'genie': '\ud83e\uddde',
    'genie_man': '\ud83e\uddde\u200d\u2642\ufe0f',
    'genie_woman': '\ud83e\uddde\u200d\u2640\ufe0f',
    'georgia': '\ud83c\uddec\ud83c\uddea',
    'ghana': '\ud83c\uddec\ud83c\udded',
    'ghost': '\ud83d\udc7b',
    'gibraltar': '\ud83c\uddec\ud83c\uddee',
    'gift': '\ud83c\udf81',
    'gift_heart': '\ud83d\udc9d',
    'giraffe': '\ud83e\udd92',
    'girl': '\ud83d\udc67',
    'globe_with_meridians': '\ud83c\udf10',
    'gloves': '\ud83e\udde4',
    'goal_net': '\ud83e\udd45',
    'goat': '\ud83d\udc10',
    'goggles': '\ud83e\udd7d',
    'golf': '\u26f3',
    'golfing': '\ud83c\udfcc\ufe0f',
    'golfing_man': '\ud83c\udfcc\ufe0f\u200d\u2642\ufe0f',
    'golfing_woman': '\ud83c\udfcc\ufe0f\u200d\u2640\ufe0f',
    'gorilla': '\ud83e\udd8d',
    'grapes': '\ud83c\udf47',
    'greece': '\ud83c\uddec\ud83c\uddf7',
    'green_apple': '\ud83c\udf4f',
    'green_book': '\ud83d\udcd7',
    'green_circle': '\ud83d\udfe2',
    'green_heart': '\ud83d\udc9a',
    'green_salad': '\ud83e\udd57',
    'green_square': '\ud83d\udfe9',
    'greenland': '\ud83c\uddec\ud83c\uddf1',
    'grenada': '\ud83c\uddec\ud83c\udde9',
    'grey_exclamation': '\u2755',
    'grey_question': '\u2754',
    'grimacing': '\ud83d\ude2c',
    'grin': '\ud83d\ude01',
    'grinning': '\ud83d\ude00',
    'guadeloupe': '\ud83c\uddec\ud83c\uddf5',
    'guam': '\ud83c\uddec\ud83c\uddfa',
    'guard': '\ud83d\udc82',
    'guardsman': '\ud83d\udc82\u200d\u2642\ufe0f',
    'guardswoman': '\ud83d\udc82\u200d\u2640\ufe0f',
    'guatemala': '\ud83c\uddec\ud83c\uddf9',
    'guernsey': '\ud83c\uddec\ud83c\uddec',
    'guide_dog': '\ud83e\uddae',
    'guinea': '\ud83c\uddec\ud83c\uddf3',
    'guinea_bissau': '\ud83c\uddec\ud83c\uddfc',
    'guitar': '\ud83c\udfb8',
    'gun': '\ud83d\udd2b',
    'guyana': '\ud83c\uddec\ud83c\uddfe',
    'haircut': '\ud83d\udc87',
    'haircut_man': '\ud83d\udc87\u200d\u2642\ufe0f',
    'haircut_woman': '\ud83d\udc87\u200d\u2640\ufe0f',
    'haiti': '\ud83c\udded\ud83c\uddf9',
    'hamburger': '\ud83c\udf54',
    'hammer': '\ud83d\udd28',
    'hammer_and_pick': '\u2692\ufe0f',
    'hammer_and_wrench': '\ud83d\udee0\ufe0f',
    'hamster': '\ud83d\udc39',
    'hand': '\u270b',
    'hand_over_mouth': '\ud83e\udd2d',
    'handbag': '\ud83d\udc5c',
    'handball_person': '\ud83e\udd3e',
    'handshake': '\ud83e\udd1d',
    'hankey': '\ud83d\udca9',
    'hash': '#\ufe0f\u20e3',
    'hatched_chick': '\ud83d\udc25',
    'hatching_chick': '\ud83d\udc23',
    'headphones': '\ud83c\udfa7',
    'health_worker': '\ud83e\uddd1\u200d\u2695\ufe0f',
    'hear_no_evil': '\ud83d\ude49',
    'heard_mcdonald_islands': '\ud83c\udded\ud83c\uddf2',
    'heart': '\u2764\ufe0f',
    'heart_decoration': '\ud83d\udc9f',
    'heart_eyes': '\ud83d\ude0d',
    'heart_eyes_cat': '\ud83d\ude3b',
    'heartbeat': '\ud83d\udc93',
    'heartpulse': '\ud83d\udc97',
    'hearts': '\u2665\ufe0f',
    'heavy_check_mark': '\u2714\ufe0f',
    'heavy_division_sign': '\u2797',
    'heavy_dollar_sign': '\ud83d\udcb2',
    'heavy_exclamation_mark': '\u2757',
    'heavy_heart_exclamation': '\u2763\ufe0f',
    'heavy_minus_sign': '\u2796',
    'heavy_multiplication_x': '\u2716\ufe0f',
    'heavy_plus_sign': '\u2795',
    'hedgehog': '\ud83e\udd94',
    'helicopter': '\ud83d\ude81',
    'herb': '\ud83c\udf3f',
    'hibiscus': '\ud83c\udf3a',
    'high_brightness': '\ud83d\udd06',
    'high_heel': '\ud83d\udc60',
    'hiking_boot': '\ud83e\udd7e',
    'hindu_temple': '\ud83d\uded5',
    'hippopotamus': '\ud83e\udd9b',
    'hocho': '\ud83d\udd2a',
    'hole': '\ud83d\udd73\ufe0f',
    'honduras': '\ud83c\udded\ud83c\uddf3',
    'honey_pot': '\ud83c\udf6f',
    'honeybee': '\ud83d\udc1d',
    'hong_kong': '\ud83c\udded\ud83c\uddf0',
    'horse': '\ud83d\udc34',
    'horse_racing': '\ud83c\udfc7',
    'hospital': '\ud83c\udfe5',
    'hot_face': '\ud83e\udd75',
    'hot_pepper': '\ud83c\udf36\ufe0f',
    'hotdog': '\ud83c\udf2d',
    'hotel': '\ud83c\udfe8',
    'hotsprings': '\u2668\ufe0f',
    'hourglass': '\u231b',
    'hourglass_flowing_sand': '\u23f3',
    'house': '\ud83c\udfe0',
    'house_with_garden': '\ud83c\udfe1',
    'houses': '\ud83c\udfd8\ufe0f',
    'hugs': '\ud83e\udd17',
    'hungary': '\ud83c\udded\ud83c\uddfa',
    'hushed': '\ud83d\ude2f',
    'ice_cream': '\ud83c\udf68',
    'ice_cube': '\ud83e\uddca',
    'ice_hockey': '\ud83c\udfd2',
    'ice_skate': '\u26f8\ufe0f',
    'icecream': '\ud83c\udf66',
    'iceland': '\ud83c\uddee\ud83c\uddf8',
    'id': '\ud83c\udd94',
    'ideograph_advantage': '\ud83c\ude50',
    'imp': '\ud83d\udc7f',
    'inbox_tray': '\ud83d\udce5',
    'incoming_envelope': '\ud83d\udce8',
    'india': '\ud83c\uddee\ud83c\uddf3',
    'indonesia': '\ud83c\uddee\ud83c\udde9',
    'infinity': '\u267e\ufe0f',
    'information_desk_person': '\ud83d\udc81',
    'information_source': '\u2139\ufe0f',
    'innocent': '\ud83d\ude07',
    'interrobang': '\u2049\ufe0f',
    'iphone': '\ud83d\udcf1',
    'iran': '\ud83c\uddee\ud83c\uddf7',
    'iraq': '\ud83c\uddee\ud83c\uddf6',
    'ireland': '\ud83c\uddee\ud83c\uddea',
    'isle_of_man': '\ud83c\uddee\ud83c\uddf2',
    'israel': '\ud83c\uddee\ud83c\uddf1',
    'it': '\ud83c\uddee\ud83c\uddf9',
    'izakaya_lantern': '\ud83c\udfee',
    'jack_o_lantern': '\ud83c\udf83',
    'jamaica': '\ud83c\uddef\ud83c\uddf2',
    'japan': '\ud83d\uddfe',
    'japanese_castle': '\ud83c\udfef',
    'japanese_goblin': '\ud83d\udc7a',
    'japanese_ogre': '\ud83d\udc79',
    'jeans': '\ud83d\udc56',
    'jersey': '\ud83c\uddef\ud83c\uddea',
    'jigsaw': '\ud83e\udde9',
    'jordan': '\ud83c\uddef\ud83c\uddf4',
    'joy': '\ud83d\ude02',
    'joy_cat': '\ud83d\ude39',
    'joystick': '\ud83d\udd79\ufe0f',
    'jp': '\ud83c\uddef\ud83c\uddf5',
    'judge': '\ud83e\uddd1\u200d\u2696\ufe0f',
    'juggling_person': '\ud83e\udd39',
    'kaaba': '\ud83d\udd4b',
    'kangaroo': '\ud83e\udd98',
    'kazakhstan': '\ud83c\uddf0\ud83c\uddff',
    'kenya': '\ud83c\uddf0\ud83c\uddea',
    'key': '\ud83d\udd11',
    'keyboard': '\u2328\ufe0f',
    'keycap_ten': '\ud83d\udd1f',
    'kick_scooter': '\ud83d\udef4',
    'kimono': '\ud83d\udc58',
    'kiribati': '\ud83c\uddf0\ud83c\uddee',
    'kiss': '\ud83d\udc8b',
    'kissing': '\ud83d\ude17',
    'kissing_cat': '\ud83d\ude3d',
    'kissing_closed_eyes': '\ud83d\ude1a',
    'kissing_heart': '\ud83d\ude18',
    'kissing_smiling_eyes': '\ud83d\ude19',
    'kite': '\ud83e\ude81',
    'kiwi_fruit': '\ud83e\udd5d',
    'kneeling_man': '\ud83e\uddce\u200d\u2642\ufe0f',
    'kneeling_person': '\ud83e\uddce',
    'kneeling_woman': '\ud83e\uddce\u200d\u2640\ufe0f',
    'knife': '\ud83d\udd2a',
    'koala': '\ud83d\udc28',
    'koko': '\ud83c\ude01',
    'kosovo': '\ud83c\uddfd\ud83c\uddf0',
    'kr': '\ud83c\uddf0\ud83c\uddf7',
    'kuwait': '\ud83c\uddf0\ud83c\uddfc',
    'kyrgyzstan': '\ud83c\uddf0\ud83c\uddec',
    'lab_coat': '\ud83e\udd7c',
    'label': '\ud83c\udff7\ufe0f',
    'lacrosse': '\ud83e\udd4d',
    'lantern': '\ud83c\udfee',
    'laos': '\ud83c\uddf1\ud83c\udde6',
    'large_blue_circle': '\ud83d\udd35',
    'large_blue_diamond': '\ud83d\udd37',
    'large_orange_diamond': '\ud83d\udd36',
    'last_quarter_moon': '\ud83c\udf17',
    'last_quarter_moon_with_face': '\ud83c\udf1c',
    'latin_cross': '\u271d\ufe0f',
    'latvia': '\ud83c\uddf1\ud83c\uddfb',
    'laughing': '\ud83d\ude06',
    'leafy_green': '\ud83e\udd6c',
    'leaves': '\ud83c\udf43',
    'lebanon': '\ud83c\uddf1\ud83c\udde7',
    'ledger': '\ud83d\udcd2',
    'left_luggage': '\ud83d\udec5',
    'left_right_arrow': '\u2194\ufe0f',
    'left_speech_bubble': '\ud83d\udde8\ufe0f',
    'leftwards_arrow_with_hook': '\u21a9\ufe0f',
    'leg': '\ud83e\uddb5',
    'lemon': '\ud83c\udf4b',
    'leo': '\u264c',
    'leopard': '\ud83d\udc06',
    'lesotho': '\ud83c\uddf1\ud83c\uddf8',
    'level_slider': '\ud83c\udf9a\ufe0f',
    'liberia': '\ud83c\uddf1\ud83c\uddf7',
    'libra': '\u264e',
    'libya': '\ud83c\uddf1\ud83c\uddfe',
    'liechtenstein': '\ud83c\uddf1\ud83c\uddee',
    'light_rail': '\ud83d\ude88',
    'link': '\ud83d\udd17',
    'lion': '\ud83e\udd81',
    'lips': '\ud83d\udc44',
    'lipstick': '\ud83d\udc84',
    'lithuania': '\ud83c\uddf1\ud83c\uddf9',
    'lizard': '\ud83e\udd8e',
    'llama': '\ud83e\udd99',
    'lobster': '\ud83e\udd9e',
    'lock': '\ud83d\udd12',
    'lock_with_ink_pen': '\ud83d\udd0f',
    'lollipop': '\ud83c\udf6d',
    'loop': '\u27bf',
    'lotion_bottle': '\ud83e\uddf4',
    'lotus_position': '\ud83e\uddd8',
    'lotus_position_man': '\ud83e\uddd8\u200d\u2642\ufe0f',
    'lotus_position_woman': '\ud83e\uddd8\u200d\u2640\ufe0f',
    'loud_sound': '\ud83d\udd0a',
    'loudspeaker': '\ud83d\udce2',
    'love_hotel': '\ud83c\udfe9',
    'love_letter': '\ud83d\udc8c',
    'love_you_gesture': '\ud83e\udd1f',
    'low_brightness': '\ud83d\udd05',
    'luggage': '\ud83e\uddf3',
    'luxembourg': '\ud83c\uddf1\ud83c\uddfa',
    'lying_face': '\ud83e\udd25',
    'm': '\u24c2\ufe0f',
    'macau': '\ud83c\uddf2\ud83c\uddf4',
    'macedonia': '\ud83c\uddf2\ud83c\uddf0',
    'madagascar': '\ud83c\uddf2\ud83c\uddec',
    'mag': '\ud83d\udd0d',
    'mag_right': '\ud83d\udd0e',
    'mage': '\ud83e\uddd9',
    'mage_man': '\ud83e\uddd9\u200d\u2642\ufe0f',
    'mage_woman': '\ud83e\uddd9\u200d\u2640\ufe0f',
    'magnet': '\ud83e\uddf2',
    'mahjong': '\ud83c\udc04',
    'mailbox': '\ud83d\udceb',
    'mailbox_closed': '\ud83d\udcea',
    'mailbox_with_mail': '\ud83d\udcec',
    'mailbox_with_no_mail': '\ud83d\udced',
    'malawi': '\ud83c\uddf2\ud83c\uddfc',
    'malaysia': '\ud83c\uddf2\ud83c\uddfe',
    'maldives': '\ud83c\uddf2\ud83c\uddfb',
    'male_detective': '\ud83d\udd75\ufe0f\u200d\u2642\ufe0f',
    'male_sign': '\u2642\ufe0f',
    'mali': '\ud83c\uddf2\ud83c\uddf1',
    'malta': '\ud83c\uddf2\ud83c\uddf9',
    'man': '\ud83d\udc68',
    'man_artist': '\ud83d\udc68\u200d\ud83c\udfa8',
    'man_astronaut': '\ud83d\udc68\u200d\ud83d\ude80',
    'man_cartwheeling': '\ud83e\udd38\u200d\u2642\ufe0f',
    'man_cook': '\ud83d\udc68\u200d\ud83c\udf73',
    'man_dancing': '\ud83d\udd7a',
    'man_facepalming': '\ud83e\udd26\u200d\u2642\ufe0f',
    'man_factory_worker': '\ud83d\udc68\u200d\ud83c\udfed',
    'man_farmer': '\ud83d\udc68\u200d\ud83c\udf3e',
    'man_firefighter': '\ud83d\udc68\u200d\ud83d\ude92',
    'man_health_worker': '\ud83d\udc68\u200d\u2695\ufe0f',
    'man_in_manual_wheelchair': '\ud83d\udc68\u200d\ud83e\uddbd',
    'man_in_motorized_wheelchair': '\ud83d\udc68\u200d\ud83e\uddbc',
    'man_in_tuxedo': '\ud83e\udd35',
    'man_judge': '\ud83d\udc68\u200d\u2696\ufe0f',
    'man_juggling': '\ud83e\udd39\u200d\u2642\ufe0f',
    'man_mechanic': '\ud83d\udc68\u200d\ud83d\udd27',
    'man_office_worker': '\ud83d\udc68\u200d\ud83d\udcbc',
    'man_pilot': '\ud83d\udc68\u200d\u2708\ufe0f',
    'man_playing_handball': '\ud83e\udd3e\u200d\u2642\ufe0f',
    'man_playing_water_polo': '\ud83e\udd3d\u200d\u2642\ufe0f',
    'man_scientist': '\ud83d\udc68\u200d\ud83d\udd2c',
    'man_shrugging': '\ud83e\udd37\u200d\u2642\ufe0f',
    'man_singer': '\ud83d\udc68\u200d\ud83c\udfa4',
    'man_student': '\ud83d\udc68\u200d\ud83c\udf93',
    'man_teacher': '\ud83d\udc68\u200d\ud83c\udfeb',
    'man_technologist': '\ud83d\udc68\u200d\ud83d\udcbb',
    'man_with_gua_pi_mao': '\ud83d\udc72',
    'man_with_probing_cane': '\ud83d\udc68\u200d\ud83e\uddaf',
    'man_with_turban': '\ud83d\udc73\u200d\u2642\ufe0f',
    'mandarin': '\ud83c\udf4a',
    'mango': '\ud83e\udd6d',
    'mans_shoe': '\ud83d\udc5e',
    'mantelpiece_clock': '\ud83d\udd70\ufe0f',
    'manual_wheelchair': '\ud83e\uddbd',
    'maple_leaf': '\ud83c\udf41',
    'marshall_islands': '\ud83c\uddf2\ud83c\udded',
    'martial_arts_uniform': '\ud83e\udd4b',
    'martinique': '\ud83c\uddf2\ud83c\uddf6',
    'mask': '\ud83d\ude37',
    'massage': '\ud83d\udc86',
    'massage_man': '\ud83d\udc86\u200d\u2642\ufe0f',
    'massage_woman': '\ud83d\udc86\u200d\u2640\ufe0f',
    'mate': '\ud83e\uddc9',
    'mauritania': '\ud83c\uddf2\ud83c\uddf7',
    'mauritius': '\ud83c\uddf2\ud83c\uddfa',
    'mayotte': '\ud83c\uddfe\ud83c\uddf9',
    'meat_on_bone': '\ud83c\udf56',
    'mechanic': '\ud83e\uddd1\u200d\ud83d\udd27',
    'mechanical_arm': '\ud83e\uddbe',
    'mechanical_leg': '\ud83e\uddbf',
    'medal_military': '\ud83c\udf96\ufe0f',
    'medal_sports': '\ud83c\udfc5',
    'medical_symbol': '\u2695\ufe0f',
    'mega': '\ud83d\udce3',
    'melon': '\ud83c\udf48',
    'memo': '\ud83d\udcdd',
    'men_wrestling': '\ud83e\udd3c\u200d\u2642\ufe0f',
    'menorah': '\ud83d\udd4e',
    'mens': '\ud83d\udeb9',
    'mermaid': '\ud83e\udddc\u200d\u2640\ufe0f',
    'merman': '\ud83e\udddc\u200d\u2642\ufe0f',
    'merperson': '\ud83e\udddc',
    'metal': '\ud83e\udd18',
    'metro': '\ud83d\ude87',
    'mexico': '\ud83c\uddf2\ud83c\uddfd',
    'microbe': '\ud83e\udda0',
    'micronesia': '\ud83c\uddeb\ud83c\uddf2',
    'microphone': '\ud83c\udfa4',
    'microscope': '\ud83d\udd2c',
    'middle_finger': '\ud83d\udd95',
    'milk_glass': '\ud83e\udd5b',
    'milky_way': '\ud83c\udf0c',
    'minibus': '\ud83d\ude90',
    'minidisc': '\ud83d\udcbd',
    'mobile_phone_off': '\ud83d\udcf4',
    'moldova': '\ud83c\uddf2\ud83c\udde9',
    'monaco': '\ud83c\uddf2\ud83c\udde8',
    'money_mouth_face': '\ud83e\udd11',
    'money_with_wings': '\ud83d\udcb8',
    'moneybag': '\ud83d\udcb0',
    'mongolia': '\ud83c\uddf2\ud83c\uddf3',
    'monkey': '\ud83d\udc12',
    'monkey_face': '\ud83d\udc35',
    'monocle_face': '\ud83e\uddd0',
    'monorail': '\ud83d\ude9d',
    'montenegro': '\ud83c\uddf2\ud83c\uddea',
    'montserrat': '\ud83c\uddf2\ud83c\uddf8',
    'moon': '\ud83c\udf14',
    'moon_cake': '\ud83e\udd6e',
    'morocco': '\ud83c\uddf2\ud83c\udde6',
    'mortar_board': '\ud83c\udf93',
    'mosque': '\ud83d\udd4c',
    'mosquito': '\ud83e\udd9f',
    'motor_boat': '\ud83d\udee5\ufe0f',
    'motor_scooter': '\ud83d\udef5',
    'motorcycle': '\ud83c\udfcd\ufe0f',
    'motorized_wheelchair': '\ud83e\uddbc',
    'motorway': '\ud83d\udee3\ufe0f',
    'mount_fuji': '\ud83d\uddfb',
    'mountain': '\u26f0\ufe0f',
    'mountain_bicyclist': '\ud83d\udeb5',
    'mountain_biking_man': '\ud83d\udeb5\u200d\u2642\ufe0f',
    'mountain_biking_woman': '\ud83d\udeb5\u200d\u2640\ufe0f',
    'mountain_cableway': '\ud83d\udea0',
    'mountain_railway': '\ud83d\ude9e',
    'mountain_snow': '\ud83c\udfd4\ufe0f',
    'mouse': '\ud83d\udc2d',
    'mouse2': '\ud83d\udc01',
    'movie_camera': '\ud83c\udfa5',
    'moyai': '\ud83d\uddff',
    'mozambique': '\ud83c\uddf2\ud83c\uddff',
    'mrs_claus': '\ud83e\udd36',
    'muscle': '\ud83d\udcaa',
    'mushroom': '\ud83c\udf44',
    'musical_keyboard': '\ud83c\udfb9',
    'musical_note': '\ud83c\udfb5',
    'musical_score': '\ud83c\udfbc',
    'mute': '\ud83d\udd07',
    'myanmar': '\ud83c\uddf2\ud83c\uddf2',
    'nail_care': '\ud83d\udc85',
    'name_badge': '\ud83d\udcdb',
    'namibia': '\ud83c\uddf3\ud83c\udde6',
    'national_park': '\ud83c\udfde\ufe0f',
    'nauru': '\ud83c\uddf3\ud83c\uddf7',
    'nauseated_face': '\ud83e\udd22',
    'nazar_amulet': '\ud83e\uddff',
    'necktie': '\ud83d\udc54',
    'negative_squared_cross_mark': '\u274e',
    'nepal': '\ud83c\uddf3\ud83c\uddf5',
    'nerd_face': '\ud83e\udd13',
    'netherlands': '\ud83c\uddf3\ud83c\uddf1',
    'neutral_face': '\ud83d\ude10',
    'new': '\ud83c\udd95',
    'new_caledonia': '\ud83c\uddf3\ud83c\udde8',
    'new_moon': '\ud83c\udf11',
    'new_moon_with_face': '\ud83c\udf1a',
    'new_zealand': '\ud83c\uddf3\ud83c\uddff',
    'newspaper': '\ud83d\udcf0',
    'newspaper_roll': '\ud83d\uddde\ufe0f',
    'next_track_button': '\u23ed\ufe0f',
    'ng': '\ud83c\udd96',
    'ng_man': '\ud83d\ude45\u200d\u2642\ufe0f',
    'ng_woman': '\ud83d\ude45\u200d\u2640\ufe0f',
    'nicaragua': '\ud83c\uddf3\ud83c\uddee',
    'niger': '\ud83c\uddf3\ud83c\uddea',
    'nigeria': '\ud83c\uddf3\ud83c\uddec',
    'night_with_stars': '\ud83c\udf03',
    'nine': '9\ufe0f\u20e3',
    'niue': '\ud83c\uddf3\ud83c\uddfa',
    'no_bell': '\ud83d\udd15',
    'no_bicycles': '\ud83d\udeb3',
    'no_entry': '\u26d4',
    'no_entry_sign': '\ud83d\udeab',
    'no_good': '\ud83d\ude45',
    'no_good_man': '\ud83d\ude45\u200d\u2642\ufe0f',
    'no_good_woman': '\ud83d\ude45\u200d\u2640\ufe0f',
    'no_mobile_phones': '\ud83d\udcf5',
    'no_mouth': '\ud83d\ude36',
    'no_pedestrians': '\ud83d\udeb7',
    'no_smoking': '\ud83d\udead',
    'non-potable_water': '\ud83d\udeb1',
    'norfolk_island': '\ud83c\uddf3\ud83c\uddeb',
    'north_korea': '\ud83c\uddf0\ud83c\uddf5',
    'northern_mariana_islands': '\ud83c\uddf2\ud83c\uddf5',
    'norway': '\ud83c\uddf3\ud83c\uddf4',
    'nose': '\ud83d\udc43',
    'notebook': '\ud83d\udcd3',
    'notebook_with_decorative_cover': '\ud83d\udcd4',
    'notes': '\ud83c\udfb6',
    'nut_and_bolt': '\ud83d\udd29',
    'o': '\u2b55',
    'o2': '\ud83c\udd7e\ufe0f',
    'ocean': '\ud83c\udf0a',
    'octopus': '\ud83d\udc19',
    'oden': '\ud83c\udf62',
    'office': '\ud83c\udfe2',
    'office_worker': '\ud83e\uddd1\u200d\ud83d\udcbc',
    'oil_drum': '\ud83d\udee2\ufe0f',
    'ok': '\ud83c\udd97',
    'ok_hand': '\ud83d\udc4c',
    'ok_man': '\ud83d\ude46\u200d\u2642\ufe0f',
    'ok_person': '\ud83d\ude46',
    'ok_woman': '\ud83d\ude46\u200d\u2640\ufe0f',
    'old_key': '\ud83d\udddd\ufe0f',
    'older_adult': '\ud83e\uddd3',
    'older_man': '\ud83d\udc74',
    'older_woman': '\ud83d\udc75',
    'om': '\ud83d\udd49\ufe0f',
    'oman': '\ud83c\uddf4\ud83c\uddf2',
    'on': '\ud83d\udd1b',
    'oncoming_automobile': '\ud83d\ude98',
    'oncoming_bus': '\ud83d\ude8d',
    'oncoming_police_car': '\ud83d\ude94',
    'oncoming_taxi': '\ud83d\ude96',
    'one': '1\ufe0f\u20e3',
    'one_piece_swimsuit': '\ud83e\ude71',
    'onion': '\ud83e\uddc5',
    'open_book': '\ud83d\udcd6',
    'open_file_folder': '\ud83d\udcc2',
    'open_hands': '\ud83d\udc50',
    'open_mouth': '\ud83d\ude2e',
    'open_umbrella': '\u2602\ufe0f',
    'ophiuchus': '\u26ce',
    'orange': '\ud83c\udf4a',
    'orange_book': '\ud83d\udcd9',
    'orange_circle': '\ud83d\udfe0',
    'orange_heart': '\ud83e\udde1',
    'orange_square': '\ud83d\udfe7',
    'orangutan': '\ud83e\udda7',
    'orthodox_cross': '\u2626\ufe0f',
    'otter': '\ud83e\udda6',
    'outbox_tray': '\ud83d\udce4',
    'owl': '\ud83e\udd89',
    'ox': '\ud83d\udc02',
    'oyster': '\ud83e\uddaa',
    'package': '\ud83d\udce6',
    'page_facing_up': '\ud83d\udcc4',
    'page_with_curl': '\ud83d\udcc3',
    'pager': '\ud83d\udcdf',
    'paintbrush': '\ud83d\udd8c\ufe0f',
    'pakistan': '\ud83c\uddf5\ud83c\uddf0',
    'palau': '\ud83c\uddf5\ud83c\uddfc',
    'palestinian_territories': '\ud83c\uddf5\ud83c\uddf8',
    'palm_tree': '\ud83c\udf34',
    'palms_up_together': '\ud83e\udd32',
    'panama': '\ud83c\uddf5\ud83c\udde6',
    'pancakes': '\ud83e\udd5e',
    'panda_face': '\ud83d\udc3c',
    'paperclip': '\ud83d\udcce',
    'paperclips': '\ud83d\udd87\ufe0f',
    'papua_new_guinea': '\ud83c\uddf5\ud83c\uddec',
    'parachute': '\ud83e\ude82',
    'paraguay': '\ud83c\uddf5\ud83c\uddfe',
    'parasol_on_ground': '\u26f1\ufe0f',
    'parking': '\ud83c\udd7f\ufe0f',
    'parrot': '\ud83e\udd9c',
    'part_alternation_mark': '\u303d\ufe0f',
    'partly_sunny': '\u26c5',
    'partying_face': '\ud83e\udd73',
    'passenger_ship': '\ud83d\udef3\ufe0f',
    'passport_control': '\ud83d\udec2',
    'pause_button': '\u23f8\ufe0f',
    'paw_prints': '\ud83d\udc3e',
    'peace_symbol': '\u262e\ufe0f',
    'peach': '\ud83c\udf51',
    'peacock': '\ud83e\udd9a',
    'peanuts': '\ud83e\udd5c',
    'pear': '\ud83c\udf50',
    'pen': '\ud83d\udd8a\ufe0f',
    'pencil': '\ud83d\udcdd',
    'pencil2': '\u270f\ufe0f',
    'penguin': '\ud83d\udc27',
    'pensive': '\ud83d\ude14',
    'people_holding_hands': '\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1',
    'performing_arts': '\ud83c\udfad',
    'persevere': '\ud83d\ude23',
    'person_bald': '\ud83e\uddd1\u200d\ud83e\uddb2',
    'person_curly_hair': '\ud83e\uddd1\u200d\ud83e\uddb1',
    'person_fencing': '\ud83e\udd3a',
    'person_in_manual_wheelchair': '\ud83e\uddd1\u200d\ud83e\uddbd',
    'person_in_motorized_wheelchair': '\ud83e\uddd1\u200d\ud83e\uddbc',
    'person_red_hair': '\ud83e\uddd1\u200d\ud83e\uddb0',
    'person_white_hair': '\ud83e\uddd1\u200d\ud83e\uddb3',
    'person_with_probing_cane': '\ud83e\uddd1\u200d\ud83e\uddaf',
    'person_with_turban': '\ud83d\udc73',
    'peru': '\ud83c\uddf5\ud83c\uddea',
    'petri_dish': '\ud83e\uddeb',
    'philippines': '\ud83c\uddf5\ud83c\udded',
    'phone': '\u260e\ufe0f',
    'pick': '\u26cf\ufe0f',
    'pie': '\ud83e\udd67',
    'pig': '\ud83d\udc37',
    'pig2': '\ud83d\udc16',
    'pig_nose': '\ud83d\udc3d',
    'pill': '\ud83d\udc8a',
    'pilot': '\ud83e\uddd1\u200d\u2708\ufe0f',
    'pinching_hand': '\ud83e\udd0f',
    'pineapple': '\ud83c\udf4d',
    'ping_pong': '\ud83c\udfd3',
    'pirate_flag': '\ud83c\udff4\u200d\u2620\ufe0f',
    'pisces': '\u2653',
    'pitcairn_islands': '\ud83c\uddf5\ud83c\uddf3',
    'pizza': '\ud83c\udf55',
    'place_of_worship': '\ud83d\uded0',
    'plate_with_cutlery': '\ud83c\udf7d\ufe0f',
    'play_or_pause_button': '\u23ef\ufe0f',
    'pleading_face': '\ud83e\udd7a',
    'point_down': '\ud83d\udc47',
    'point_left': '\ud83d\udc48',
    'point_right': '\ud83d\udc49',
    'point_up': '\u261d\ufe0f',
    'point_up_2': '\ud83d\udc46',
    'poland': '\ud83c\uddf5\ud83c\uddf1',
    'police_car': '\ud83d\ude93',
    'police_officer': '\ud83d\udc6e',
    'policeman': '\ud83d\udc6e\u200d\u2642\ufe0f',
    'policewoman': '\ud83d\udc6e\u200d\u2640\ufe0f',
    'poodle': '\ud83d\udc29',
    'poop': '\ud83d\udca9',
    'popcorn': '\ud83c\udf7f',
    'portugal': '\ud83c\uddf5\ud83c\uddf9',
    'post_office': '\ud83c\udfe3',
    'postal_horn': '\ud83d\udcef',
    'postbox': '\ud83d\udcee',
    'potable_water': '\ud83d\udeb0',
    'potato': '\ud83e\udd54',
    'pouch': '\ud83d\udc5d',
    'poultry_leg': '\ud83c\udf57',
    'pound': '\ud83d\udcb7',
    'pout': '\ud83d\ude21',
    'pouting_cat': '\ud83d\ude3e',
    'pouting_face': '\ud83d\ude4e',
    'pouting_man': '\ud83d\ude4e\u200d\u2642\ufe0f',
    'pouting_woman': '\ud83d\ude4e\u200d\u2640\ufe0f',
    'pray': '\ud83d\ude4f',
    'prayer_beads': '\ud83d\udcff',
    'pregnant_woman': '\ud83e\udd30',
    'pretzel': '\ud83e\udd68',
    'previous_track_button': '\u23ee\ufe0f',
    'prince': '\ud83e\udd34',
    'princess': '\ud83d\udc78',
    'printer': '\ud83d\udda8\ufe0f',
    'probing_cane': '\ud83e\uddaf',
    'puerto_rico': '\ud83c\uddf5\ud83c\uddf7',
    'punch': '\ud83d\udc4a',
    'purple_circle': '\ud83d\udfe3',
    'purple_heart': '\ud83d\udc9c',
    'purple_square': '\ud83d\udfea',
    'purse': '\ud83d\udc5b',
    'pushpin': '\ud83d\udccc',
    'put_litter_in_its_place': '\ud83d\udeae',
    'qatar': '\ud83c\uddf6\ud83c\udde6',
    'question': '\u2753',
    'rabbit': '\ud83d\udc30',
    'rabbit2': '\ud83d\udc07',
    'raccoon': '\ud83e\udd9d',
    'racehorse': '\ud83d\udc0e',
    'racing_car': '\ud83c\udfce\ufe0f',
    'radio': '\ud83d\udcfb',
    'radio_button': '\ud83d\udd18',
    'radioactive': '\u2622\ufe0f',
    'rage': '\ud83d\ude21',
    'railway_car': '\ud83d\ude83',
    'railway_track': '\ud83d\udee4\ufe0f',
    'rainbow': '\ud83c\udf08',
    'rainbow_flag': '\ud83c\udff3\ufe0f\u200d\ud83c\udf08',
    'raised_back_of_hand': '\ud83e\udd1a',
    'raised_eyebrow': '\ud83e\udd28',
    'raised_hand': '\u270b',
    'raised_hand_with_fingers_splayed': '\ud83d\udd90\ufe0f',
    'raised_hands': '\ud83d\ude4c',
    'raising_hand': '\ud83d\ude4b',
    'raising_hand_man': '\ud83d\ude4b\u200d\u2642\ufe0f',
    'raising_hand_woman': '\ud83d\ude4b\u200d\u2640\ufe0f',
    'ram': '\ud83d\udc0f',
    'ramen': '\ud83c\udf5c',
    'rat': '\ud83d\udc00',
    'razor': '\ud83e\ude92',
    'receipt': '\ud83e\uddfe',
    'record_button': '\u23fa\ufe0f',
    'recycle': '\u267b\ufe0f',
    'red_car': '\ud83d\ude97',
    'red_circle': '\ud83d\udd34',
    'red_envelope': '\ud83e\udde7',
    'red_haired_man': '\ud83d\udc68\u200d\ud83e\uddb0',
    'red_haired_woman': '\ud83d\udc69\u200d\ud83e\uddb0',
    'red_square': '\ud83d\udfe5',
    'registered': '\u00ae\ufe0f',
    'relaxed': '\u263a\ufe0f',
    'relieved': '\ud83d\ude0c',
    'reminder_ribbon': '\ud83c\udf97\ufe0f',
    'repeat': '\ud83d\udd01',
    'repeat_one': '\ud83d\udd02',
    'rescue_worker_helmet': '\u26d1\ufe0f',
    'restroom': '\ud83d\udebb',
    'reunion': '\ud83c\uddf7\ud83c\uddea',
    'revolving_hearts': '\ud83d\udc9e',
    'rewind': '\u23ea',
    'rhinoceros': '\ud83e\udd8f',
    'ribbon': '\ud83c\udf80',
    'rice': '\ud83c\udf5a',
    'rice_ball': '\ud83c\udf59',
    'rice_cracker': '\ud83c\udf58',
    'rice_scene': '\ud83c\udf91',
    'right_anger_bubble': '\ud83d\uddef\ufe0f',
    'ring': '\ud83d\udc8d',
    'ringed_planet': '\ud83e\ude90',
    'robot': '\ud83e\udd16',
    'rocket': '\ud83d\ude80',
    'rofl': '\ud83e\udd23',
    'roll_eyes': '\ud83d\ude44',
    'roll_of_paper': '\ud83e\uddfb',
    'roller_coaster': '\ud83c\udfa2',
    'romania': '\ud83c\uddf7\ud83c\uddf4',
    'rooster': '\ud83d\udc13',
    'rose': '\ud83c\udf39',
    'rosette': '\ud83c\udff5\ufe0f',
    'rotating_light': '\ud83d\udea8',
    'round_pushpin': '\ud83d\udccd',
    'rowboat': '\ud83d\udea3',
    'rowing_man': '\ud83d\udea3\u200d\u2642\ufe0f',
    'rowing_woman': '\ud83d\udea3\u200d\u2640\ufe0f',
    'ru': '\ud83c\uddf7\ud83c\uddfa',
    'rugby_football': '\ud83c\udfc9',
    'runner': '\ud83c\udfc3',
    'running': '\ud83c\udfc3',
    'running_man': '\ud83c\udfc3\u200d\u2642\ufe0f',
    'running_shirt_with_sash': '\ud83c\udfbd',
    'running_woman': '\ud83c\udfc3\u200d\u2640\ufe0f',
    'rwanda': '\ud83c\uddf7\ud83c\uddfc',
    'sa': '\ud83c\ude02\ufe0f',
    'safety_pin': '\ud83e\uddf7',
    'safety_vest': '\ud83e\uddba',
    'sagittarius': '\u2650',
    'sailboat': '\u26f5',
    'sake': '\ud83c\udf76',
    'salt': '\ud83e\uddc2',
    'samoa': '\ud83c\uddfc\ud83c\uddf8',
    'san_marino': '\ud83c\uddf8\ud83c\uddf2',
    'sandal': '\ud83d\udc61',
    'sandwich': '\ud83e\udd6a',
    'santa': '\ud83c\udf85',
    'sao_tome_principe': '\ud83c\uddf8\ud83c\uddf9',
    'sari': '\ud83e\udd7b',
    'sassy_man': '\ud83d\udc81\u200d\u2642\ufe0f',
    'sassy_woman': '\ud83d\udc81\u200d\u2640\ufe0f',
    'satellite': '\ud83d\udce1',
    'satisfied': '\ud83d\ude06',
    'saudi_arabia': '\ud83c\uddf8\ud83c\udde6',
    'sauna_man': '\ud83e\uddd6\u200d\u2642\ufe0f',
    'sauna_person': '\ud83e\uddd6',
    'sauna_woman': '\ud83e\uddd6\u200d\u2640\ufe0f',
    'sauropod': '\ud83e\udd95',
    'saxophone': '\ud83c\udfb7',
    'scarf': '\ud83e\udde3',
    'school': '\ud83c\udfeb',
    'school_satchel': '\ud83c\udf92',
    'scientist': '\ud83e\uddd1\u200d\ud83d\udd2c',
    'scissors': '\u2702\ufe0f',
    'scorpion': '\ud83e\udd82',
    'scorpius': '\u264f',
    'scotland': '\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f',
    'scream': '\ud83d\ude31',
    'scream_cat': '\ud83d\ude40',
    'scroll': '\ud83d\udcdc',
    'seat': '\ud83d\udcba',
    'secret': '\u3299\ufe0f',
    'see_no_evil': '\ud83d\ude48',
    'seedling': '\ud83c\udf31',
    'selfie': '\ud83e\udd33',
    'senegal': '\ud83c\uddf8\ud83c\uddf3',
    'serbia': '\ud83c\uddf7\ud83c\uddf8',
    'service_dog': '\ud83d\udc15\u200d\ud83e\uddba',
    'seven': '7\ufe0f\u20e3',
    'seychelles': '\ud83c\uddf8\ud83c\udde8',
    'shallow_pan_of_food': '\ud83e\udd58',
    'shamrock': '\u2618\ufe0f',
    'shark': '\ud83e\udd88',
    'shaved_ice': '\ud83c\udf67',
    'sheep': '\ud83d\udc11',
    'shell': '\ud83d\udc1a',
    'shield': '\ud83d\udee1\ufe0f',
    'shinto_shrine': '\u26e9\ufe0f',
    'ship': '\ud83d\udea2',
    'shirt': '\ud83d\udc55',
    'shit': '\ud83d\udca9',
    'shoe': '\ud83d\udc5e',
    'shopping': '\ud83d\udecd\ufe0f',
    'shopping_cart': '\ud83d\uded2',
    'shorts': '\ud83e\ude73',
    'shower': '\ud83d\udebf',
    'shrimp': '\ud83e\udd90',
    'shrug': '\ud83e\udd37',
    'shushing_face': '\ud83e\udd2b',
    'sierra_leone': '\ud83c\uddf8\ud83c\uddf1',
    'signal_strength': '\ud83d\udcf6',
    'singapore': '\ud83c\uddf8\ud83c\uddec',
    'singer': '\ud83e\uddd1\u200d\ud83c\udfa4',
    'sint_maarten': '\ud83c\uddf8\ud83c\uddfd',
    'six': '6\ufe0f\u20e3',
    'six_pointed_star': '\ud83d\udd2f',
    'skateboard': '\ud83d\udef9',
    'ski': '\ud83c\udfbf',
    'skier': '\u26f7\ufe0f',
    'skull': '\ud83d\udc80',
    'skull_and_crossbones': '\u2620\ufe0f',
    'skunk': '\ud83e\udda8',
    'sled': '\ud83d\udef7',
    'sleeping': '\ud83d\ude34',
    'sleeping_bed': '\ud83d\udecc',
    'sleepy': '\ud83d\ude2a',
    'slightly_frowning_face': '\ud83d\ude41',
    'slightly_smiling_face': '\ud83d\ude42',
    'slot_machine': '\ud83c\udfb0',
    'sloth': '\ud83e\udda5',
    'slovakia': '\ud83c\uddf8\ud83c\uddf0',
    'slovenia': '\ud83c\uddf8\ud83c\uddee',
    'small_airplane': '\ud83d\udee9\ufe0f',
    'small_blue_diamond': '\ud83d\udd39',
    'small_orange_diamond': '\ud83d\udd38',
    'small_red_triangle': '\ud83d\udd3a',
    'small_red_triangle_down': '\ud83d\udd3b',
    'smile': '\ud83d\ude04',
    'smile_cat': '\ud83d\ude38',
    'smiley': '\ud83d\ude03',
    'smiley_cat': '\ud83d\ude3a',
    'smiling_face_with_three_hearts': '\ud83e\udd70',
    'smiling_imp': '\ud83d\ude08',
    'smirk': '\ud83d\ude0f',
    'smirk_cat': '\ud83d\ude3c',
    'smoking': '\ud83d\udeac',
    'snail': '\ud83d\udc0c',
    'snake': '\ud83d\udc0d',
    'sneezing_face': '\ud83e\udd27',
    'snowboarder': '\ud83c\udfc2',
    'snowflake': '\u2744\ufe0f',
    'snowman': '\u26c4',
    'snowman_with_snow': '\u2603\ufe0f',
    'soap': '\ud83e\uddfc',
    'sob': '\ud83d\ude2d',
    'soccer': '\u26bd',
    'socks': '\ud83e\udde6',
    'softball': '\ud83e\udd4e',
    'solomon_islands': '\ud83c\uddf8\ud83c\udde7',
    'somalia': '\ud83c\uddf8\ud83c\uddf4',
    'soon': '\ud83d\udd1c',
    'sos': '\ud83c\udd98',
    'sound': '\ud83d\udd09',
    'south_africa': '\ud83c\uddff\ud83c\udde6',
    'south_georgia_south_sandwich_islands': '\ud83c\uddec\ud83c\uddf8',
    'south_sudan': '\ud83c\uddf8\ud83c\uddf8',
    'space_invader': '\ud83d\udc7e',
    'spades': '\u2660\ufe0f',
    'spaghetti': '\ud83c\udf5d',
    'sparkle': '\u2747\ufe0f',
    'sparkler': '\ud83c\udf87',
    'sparkles': '\u2728',
    'sparkling_heart': '\ud83d\udc96',
    'speak_no_evil': '\ud83d\ude4a',
    'speaker': '\ud83d\udd08',
    'speaking_head': '\ud83d\udde3\ufe0f',
    'speech_balloon': '\ud83d\udcac',
    'speedboat': '\ud83d\udea4',
    'spider': '\ud83d\udd77\ufe0f',
    'spider_web': '\ud83d\udd78\ufe0f',
    'spiral_calendar': '\ud83d\uddd3\ufe0f',
    'spiral_notepad': '\ud83d\uddd2\ufe0f',
    'sponge': '\ud83e\uddfd',
    'spoon': '\ud83e\udd44',
    'squid': '\ud83e\udd91',
    'sri_lanka': '\ud83c\uddf1\ud83c\uddf0',
    'st_barthelemy': '\ud83c\udde7\ud83c\uddf1',
    'st_helena': '\ud83c\uddf8\ud83c\udded',
    'st_kitts_nevis': '\ud83c\uddf0\ud83c\uddf3',
    'st_lucia': '\ud83c\uddf1\ud83c\udde8',
    'st_martin': '\ud83c\uddf2\ud83c\uddeb',
    'st_pierre_miquelon': '\ud83c\uddf5\ud83c\uddf2',
    'st_vincent_grenadines': '\ud83c\uddfb\ud83c\udde8',
    'stadium': '\ud83c\udfdf\ufe0f',
    'standing_man': '\ud83e\uddcd\u200d\u2642\ufe0f',
    'standing_person': '\ud83e\uddcd',
    'standing_woman': '\ud83e\uddcd\u200d\u2640\ufe0f',
    'star': '\u2b50',
    'star2': '\ud83c\udf1f',
    'star_and_crescent': '\u262a\ufe0f',
    'star_of_david': '\u2721\ufe0f',
    'star_struck': '\ud83e\udd29',
    'stars': '\ud83c\udf20',
    'station': '\ud83d\ude89',
    'statue_of_liberty': '\ud83d\uddfd',
    'steam_locomotive': '\ud83d\ude82',
    'stethoscope': '\ud83e\ude7a',
    'stew': '\ud83c\udf72',
    'stop_button': '\u23f9\ufe0f',
    'stop_sign': '\ud83d\uded1',
    'stopwatch': '\u23f1\ufe0f',
    'straight_ruler': '\ud83d\udccf',
    'strawberry': '\ud83c\udf53',
    'stuck_out_tongue': '\ud83d\ude1b',
    'stuck_out_tongue_closed_eyes': '\ud83d\ude1d',
    'stuck_out_tongue_winking_eye': '\ud83d\ude1c',
    'student': '\ud83e\uddd1\u200d\ud83c\udf93',
    'studio_microphone': '\ud83c\udf99\ufe0f',
    'stuffed_flatbread': '\ud83e\udd59',
    'sudan': '\ud83c\uddf8\ud83c\udde9',
    'sun_behind_large_cloud': '\ud83c\udf25\ufe0f',
    'sun_behind_rain_cloud': '\ud83c\udf26\ufe0f',
    'sun_behind_small_cloud': '\ud83c\udf24\ufe0f',
    'sun_with_face': '\ud83c\udf1e',
    'sunflower': '\ud83c\udf3b',
    'sunglasses': '\ud83d\ude0e',
    'sunny': '\u2600\ufe0f',
    'sunrise': '\ud83c\udf05',
    'sunrise_over_mountains': '\ud83c\udf04',
    'superhero': '\ud83e\uddb8',
    'superhero_man': '\ud83e\uddb8\u200d\u2642\ufe0f',
    'superhero_woman': '\ud83e\uddb8\u200d\u2640\ufe0f',
    'supervillain': '\ud83e\uddb9',
    'supervillain_man': '\ud83e\uddb9\u200d\u2642\ufe0f',
    'supervillain_woman': '\ud83e\uddb9\u200d\u2640\ufe0f',
    'surfer': '\ud83c\udfc4',
    'surfing_man': '\ud83c\udfc4\u200d\u2642\ufe0f',
    'surfing_woman': '\ud83c\udfc4\u200d\u2640\ufe0f',
    'suriname': '\ud83c\uddf8\ud83c\uddf7',
    'sushi': '\ud83c\udf63',
    'suspension_railway': '\ud83d\ude9f',
    'svalbard_jan_mayen': '\ud83c\uddf8\ud83c\uddef',
    'swan': '\ud83e\udda2',
    'swaziland': '\ud83c\uddf8\ud83c\uddff',
    'sweat': '\ud83d\ude13',
    'sweat_drops': '\ud83d\udca6',
    'sweat_smile': '\ud83d\ude05',
    'sweden': '\ud83c\uddf8\ud83c\uddea',
    'sweet_potato': '\ud83c\udf60',
    'swim_brief': '\ud83e\ude72',
    'swimmer': '\ud83c\udfca',
    'swimming_man': '\ud83c\udfca\u200d\u2642\ufe0f',
    'swimming_woman': '\ud83c\udfca\u200d\u2640\ufe0f',
    'switzerland': '\ud83c\udde8\ud83c\udded',
    'symbols': '\ud83d\udd23',
    'synagogue': '\ud83d\udd4d',
    'syria': '\ud83c\uddf8\ud83c\uddfe',
    'syringe': '\ud83d\udc89',
    't-rex': '\ud83e\udd96',
    'taco': '\ud83c\udf2e',
    'tada': '\ud83c\udf89',
    'taiwan': '\ud83c\uddf9\ud83c\uddfc',
    'tajikistan': '\ud83c\uddf9\ud83c\uddef',
    'takeout_box': '\ud83e\udd61',
    'tanabata_tree': '\ud83c\udf8b',
    'tangerine': '\ud83c\udf4a',
    'tanzania': '\ud83c\uddf9\ud83c\uddff',
    'taurus': '\u2649',
    'taxi': '\ud83d\ude95',
    'tea': '\ud83c\udf75',
    'teacher': '\ud83e\uddd1\u200d\ud83c\udfeb',
    'technologist': '\ud83e\uddd1\u200d\ud83d\udcbb',
    'teddy_bear': '\ud83e\uddf8',
    'telephone': '\u260e\ufe0f',
    'telephone_receiver': '\ud83d\udcde',
    'telescope': '\ud83d\udd2d',
    'tennis': '\ud83c\udfbe',
    'tent': '\u26fa',
    'test_tube': '\ud83e\uddea',
    'thailand': '\ud83c\uddf9\ud83c\udded',
    'thermometer': '\ud83c\udf21\ufe0f',
    'thinking': '\ud83e\udd14',
    'thought_balloon': '\ud83d\udcad',
    'thread': '\ud83e\uddf5',
    'three': '3\ufe0f\u20e3',
    'thumbsdown': '\ud83d\udc4e',
    'thumbsup': '\ud83d\udc4d',
    'ticket': '\ud83c\udfab',
    'tickets': '\ud83c\udf9f\ufe0f',
    'tiger': '\ud83d\udc2f',
    'tiger2': '\ud83d\udc05',
    'timer_clock': '\u23f2\ufe0f',
    'timor_leste': '\ud83c\uddf9\ud83c\uddf1',
    'tipping_hand_man': '\ud83d\udc81\u200d\u2642\ufe0f',
    'tipping_hand_person': '\ud83d\udc81',
    'tipping_hand_woman': '\ud83d\udc81\u200d\u2640\ufe0f',
    'tired_face': '\ud83d\ude2b',
    'tm': '\u2122\ufe0f',
    'togo': '\ud83c\uddf9\ud83c\uddec',
    'toilet': '\ud83d\udebd',
    'tokelau': '\ud83c\uddf9\ud83c\uddf0',
    'tokyo_tower': '\ud83d\uddfc',
    'tomato': '\ud83c\udf45',
    'tonga': '\ud83c\uddf9\ud83c\uddf4',
    'tongue': '\ud83d\udc45',
    'toolbox': '\ud83e\uddf0',
    'tooth': '\ud83e\uddb7',
    'top': '\ud83d\udd1d',
    'tophat': '\ud83c\udfa9',
    'tornado': '\ud83c\udf2a\ufe0f',
    'tr': '\ud83c\uddf9\ud83c\uddf7',
    'trackball': '\ud83d\uddb2\ufe0f',
    'tractor': '\ud83d\ude9c',
    'traffic_light': '\ud83d\udea5',
    'train': '\ud83d\ude8b',
    'train2': '\ud83d\ude86',
    'tram': '\ud83d\ude8a',
    'triangular_flag_on_post': '\ud83d\udea9',
    'triangular_ruler': '\ud83d\udcd0',
    'trident': '\ud83d\udd31',
    'trinidad_tobago': '\ud83c\uddf9\ud83c\uddf9',
    'tristan_da_cunha': '\ud83c\uddf9\ud83c\udde6',
    'triumph': '\ud83d\ude24',
    'trolleybus': '\ud83d\ude8e',
    'trophy': '\ud83c\udfc6',
    'tropical_drink': '\ud83c\udf79',
    'tropical_fish': '\ud83d\udc20',
    'truck': '\ud83d\ude9a',
    'trumpet': '\ud83c\udfba',
    'tshirt': '\ud83d\udc55',
    'tulip': '\ud83c\udf37',
    'tumbler_glass': '\ud83e\udd43',
    'tunisia': '\ud83c\uddf9\ud83c\uddf3',
    'turkey': '\ud83e\udd83',
    'turkmenistan': '\ud83c\uddf9\ud83c\uddf2',
    'turks_caicos_islands': '\ud83c\uddf9\ud83c\udde8',
    'turtle': '\ud83d\udc22',
    'tuvalu': '\ud83c\uddf9\ud83c\uddfb',
    'tv': '\ud83d\udcfa',
    'twisted_rightwards_arrows': '\ud83d\udd00',
    'two': '2\ufe0f\u20e3',
    'two_hearts': '\ud83d\udc95',
    'two_men_holding_hands': '\ud83d\udc6c',
    'two_women_holding_hands': '\ud83d\udc6d',
    'u5272': '\ud83c\ude39',
    'u5408': '\ud83c\ude34',
    'u55b6': '\ud83c\ude3a',
    'u6307': '\ud83c\ude2f',
    'u6708': '\ud83c\ude37\ufe0f',
    'u6709': '\ud83c\ude36',
    'u6e80': '\ud83c\ude35',
    'u7121': '\ud83c\ude1a',
    'u7533': '\ud83c\ude38',
    'u7981': '\ud83c\ude32',
    'u7a7a': '\ud83c\ude33',
    'uganda': '\ud83c\uddfa\ud83c\uddec',
    'uk': '\ud83c\uddec\ud83c\udde7',
    'ukraine': '\ud83c\uddfa\ud83c\udde6',
    'umbrella': '\u2614',
    'unamused': '\ud83d\ude12',
    'underage': '\ud83d\udd1e',
    'unicorn': '\ud83e\udd84',
    'united_arab_emirates': '\ud83c\udde6\ud83c\uddea',
    'united_nations': '\ud83c\uddfa\ud83c\uddf3',
    'unlock': '\ud83d\udd13',
    'up': '\ud83c\udd99',
    'upside_down_face': '\ud83d\ude43',
    'uruguay': '\ud83c\uddfa\ud83c\uddfe',
    'us': '\ud83c\uddfa\ud83c\uddf8',
    'us_outlying_islands': '\ud83c\uddfa\ud83c\uddf2',
    'us_virgin_islands': '\ud83c\uddfb\ud83c\uddee',
    'uzbekistan': '\ud83c\uddfa\ud83c\uddff',
    'v': '\u270c\ufe0f',
    'vampire': '\ud83e\udddb',
    'vampire_man': '\ud83e\udddb\u200d\u2642\ufe0f',
    'vampire_woman': '\ud83e\udddb\u200d\u2640\ufe0f',
    'vanuatu': '\ud83c\uddfb\ud83c\uddfa',
    'vatican_city': '\ud83c\uddfb\ud83c\udde6',
    'venezuela': '\ud83c\uddfb\ud83c\uddea',
    'vertical_traffic_light': '\ud83d\udea6',
    'vhs': '\ud83d\udcfc',
    'vibration_mode': '\ud83d\udcf3',
    'video_camera': '\ud83d\udcf9',
    'video_game': '\ud83c\udfae',
    'vietnam': '\ud83c\uddfb\ud83c\uddf3',
    'violin': '\ud83c\udfbb',
    'virgo': '\u264d',
    'volcano': '\ud83c\udf0b',
    'volleyball': '\ud83c\udfd0',
    'vomiting_face': '\ud83e\udd2e',
    'vs': '\ud83c\udd9a',
    'vulcan_salute': '\ud83d\udd96',
    'waffle': '\ud83e\uddc7',
    'wales': '\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f',
    'walking': '\ud83d\udeb6',
    'walking_man': '\ud83d\udeb6\u200d\u2642\ufe0f',
    'walking_woman': '\ud83d\udeb6\u200d\u2640\ufe0f',
    'wallis_futuna': '\ud83c\uddfc\ud83c\uddeb',
    'waning_crescent_moon': '\ud83c\udf18',
    'waning_gibbous_moon': '\ud83c\udf16',
    'warning': '\u26a0\ufe0f',
    'wastebasket': '\ud83d\uddd1\ufe0f',
    'watch': '\u231a',
    'water_buffalo': '\ud83d\udc03',
    'water_polo': '\ud83e\udd3d',
    'watermelon': '\ud83c\udf49',
    'wave': '\ud83d\udc4b',
    'wavy_dash': '\u3030\ufe0f',
    'waxing_crescent_moon': '\ud83c\udf12',
    'waxing_gibbous_moon': '\ud83c\udf14',
    'wc': '\ud83d\udebe',
    'weary': '\ud83d\ude29',
    'wedding': '\ud83d\udc92',
    'weight_lifting': '\ud83c\udfcb\ufe0f',
    'weight_lifting_man': '\ud83c\udfcb\ufe0f\u200d\u2642\ufe0f',
    'weight_lifting_woman': '\ud83c\udfcb\ufe0f\u200d\u2640\ufe0f',
    'western_sahara': '\ud83c\uddea\ud83c\udded',
    'whale': '\ud83d\udc33',
    'whale2': '\ud83d\udc0b',
    'wheel_of_dharma': '\u2638\ufe0f',
    'wheelchair': '\u267f',
    'white_check_mark': '\u2705',
    'white_circle': '\u26aa',
    'white_flag': '\ud83c\udff3\ufe0f',
    'white_flower': '\ud83d\udcae',
    'white_haired_man': '\ud83d\udc68\u200d\ud83e\uddb3',
    'white_haired_woman': '\ud83d\udc69\u200d\ud83e\uddb3',
    'white_heart': '\ud83e\udd0d',
    'white_large_square': '\u2b1c',
    'white_medium_small_square': '\u25fd',
    'white_medium_square': '\u25fb\ufe0f',
    'white_small_square': '\u25ab\ufe0f',
    'white_square_button': '\ud83d\udd33',
    'wilted_flower': '\ud83e\udd40',
    'wind_chime': '\ud83c\udf90',
    'wind_face': '\ud83c\udf2c\ufe0f',
    'wine_glass': '\ud83c\udf77',
    'wink': '\ud83d\ude09',
    'wolf': '\ud83d\udc3a',
    'woman': '\ud83d\udc69',
    'woman_artist': '\ud83d\udc69\u200d\ud83c\udfa8',
    'woman_astronaut': '\ud83d\udc69\u200d\ud83d\ude80',
    'woman_cartwheeling': '\ud83e\udd38\u200d\u2640\ufe0f',
    'woman_cook': '\ud83d\udc69\u200d\ud83c\udf73',
    'woman_dancing': '\ud83d\udc83',
    'woman_facepalming': '\ud83e\udd26\u200d\u2640\ufe0f',
    'woman_factory_worker': '\ud83d\udc69\u200d\ud83c\udfed',
    'woman_farmer': '\ud83d\udc69\u200d\ud83c\udf3e',
    'woman_firefighter': '\ud83d\udc69\u200d\ud83d\ude92',
    'woman_health_worker': '\ud83d\udc69\u200d\u2695\ufe0f',
    'woman_in_manual_wheelchair': '\ud83d\udc69\u200d\ud83e\uddbd',
    'woman_in_motorized_wheelchair': '\ud83d\udc69\u200d\ud83e\uddbc',
    'woman_judge': '\ud83d\udc69\u200d\u2696\ufe0f',
    'woman_juggling': '\ud83e\udd39\u200d\u2640\ufe0f',
    'woman_mechanic': '\ud83d\udc69\u200d\ud83d\udd27',
    'woman_office_worker': '\ud83d\udc69\u200d\ud83d\udcbc',
    'woman_pilot': '\ud83d\udc69\u200d\u2708\ufe0f',
    'woman_playing_handball': '\ud83e\udd3e\u200d\u2640\ufe0f',
    'woman_playing_water_polo': '\ud83e\udd3d\u200d\u2640\ufe0f',
    'woman_scientist': '\ud83d\udc69\u200d\ud83d\udd2c',
    'woman_shrugging': '\ud83e\udd37\u200d\u2640\ufe0f',
    'woman_singer': '\ud83d\udc69\u200d\ud83c\udfa4',
    'woman_student': '\ud83d\udc69\u200d\ud83c\udf93',
    'woman_teacher': '\ud83d\udc69\u200d\ud83c\udfeb',
    'woman_technologist': '\ud83d\udc69\u200d\ud83d\udcbb',
    'woman_with_headscarf': '\ud83e\uddd5',
    'woman_with_probing_cane': '\ud83d\udc69\u200d\ud83e\uddaf',
    'woman_with_turban': '\ud83d\udc73\u200d\u2640\ufe0f',
    'womans_clothes': '\ud83d\udc5a',
    'womans_hat': '\ud83d\udc52',
    'women_wrestling': '\ud83e\udd3c\u200d\u2640\ufe0f',
    'womens': '\ud83d\udeba',
    'woozy_face': '\ud83e\udd74',
    'world_map': '\ud83d\uddfa\ufe0f',
    'worried': '\ud83d\ude1f',
    'wrench': '\ud83d\udd27',
    'wrestling': '\ud83e\udd3c',
    'writing_hand': '\u270d\ufe0f',
    'x': '\u274c',
    'yarn': '\ud83e\uddf6',
    'yawning_face': '\ud83e\udd71',
    'yellow_circle': '\ud83d\udfe1',
    'yellow_heart': '\ud83d\udc9b',
    'yellow_square': '\ud83d\udfe8',
    'yemen': '\ud83c\uddfe\ud83c\uddea',
    'yen': '\ud83d\udcb4',
    'yin_yang': '\u262f\ufe0f',
    'yo_yo': '\ud83e\ude80',
    'yum': '\ud83d\ude0b',
    'zambia': '\ud83c\uddff\ud83c\uddf2',
    'zany_face': '\ud83e\udd2a',
    'zap': '\u26a1',
    'zebra': '\ud83e\udd93',
    'zero': '0\ufe0f\u20e3',
    'zimbabwe': '\ud83c\uddff\ud83c\uddfc',
    'zipper_mouth_face': '\ud83e\udd10',
    'zombie': '\ud83e\udddf',
    'zombie_man': '\ud83e\udddf\u200d\u2642\ufe0f',
    'zombie_woman': '\ud83e\udddf\u200d\u2640\ufe0f',
    'zzz': '\ud83d\udca4',

    /* special emojis :P */
    'atom': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/atom.png?v8">',
    'basecamp': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/basecamp.png?v8">',
    'basecampy': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/basecampy.png?v8">',
    'bowtie': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/bowtie.png?v8">',
    'electron': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/electron.png?v8">',
    'feelsgood': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/feelsgood.png?v8">',
    'finnadie': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/finnadie.png?v8">',
    'goberserk': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/goberserk.png?v8">',
    'godmode': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/godmode.png?v8">',
    'hurtrealbad': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/hurtrealbad.png?v8">',
    'neckbeard': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/neckbeard.png?v8">',
    'octocat': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/octocat.png?v8">',
    'rage1': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/rage1.png?v8">',
    'rage2': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/rage2.png?v8">',
    'rage3': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/rage3.png?v8">',
    'rage4': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/rage4.png?v8">',
    'shipit': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/shipit.png?v8">',
    'suspect': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/suspect.png?v8">',
    'trollface': '<img width="20" height="20" align="absmiddle" src="https://github.githubassets.com/images/icons/emoji/trollface.png?v8">',
    'showdown': '<img width="20" height="20" align="absmiddle" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAS1BMVEX///8jJS0jJS0jJS0jJS0jJS0jJS0jJS0jJS0jJS0jJS0jJS0jJS0jJS0jJS0jJS0jJS3b1q3b1q3b1q3b1q3b1q3b1q3b1q3b1q0565CIAAAAGXRSTlMAQHCAYCCw/+DQwPCQUBAwoHCAEP+wwFBgS2fvBgAAAUZJREFUeAHs1cGy7BAUheFFsEDw/k97VTq3T6ge2EmdM+pvrP6Iwd74XV9Kb52xuMU4/uc1YNgZLFOeV8FGdhGrNk5SEgUyPxAEdj4LlMRDyhVAMVEa2M7TBSeVZAFPdqHgzSZJwPKgcLFLAooHDJo4EDCw4gAtBoJA5UFj4Ng5LOGLwVXZuoIlji/jeQHFk7+baHxrCjeUwB9+s88KndvlhcyBN5BSkYNQIVVb4pV+Npm7hhuKDs/uMP5KxT3WzSNNLIuuoDpMmuAVMruMSeDyQBi24DTr43LAY7ILA1QYaWkgfHzFthYYzg67SQsCbB8GhJUEGCtO9n0rSaCLxgJQjS/JSgMTg2eBDEHAJ+H350AsjYNYscrErgI2e/l+mdR967TCX/v6N0EhPECYCP0i+IAoYQOE8BogNhQMEMdrgAQWHaMAAGi5I5euoY9NAAAAAElFTkSuQmCC">'
  };

  /**
   * These are all the transformations that form block-level
   * tags like paragraphs, headers, and list items.
   */
  showdown.subParser('makehtml.blockGamut', function (text, options, globals) {
    'use strict';

    text = globals.converter._dispatch('makehtml.blockGamut.before', text, options, globals).getText();

    // we parse blockquotes first so that we can have headings and hrs
    // inside blockquotes
    text = showdown.subParser('makehtml.blockQuotes')(text, options, globals);
    text = showdown.subParser('makehtml.headers')(text, options, globals);

    // Do Horizontal Rules:
    text = showdown.subParser('makehtml.horizontalRule')(text, options, globals);

    text = showdown.subParser('makehtml.lists')(text, options, globals);
    text = showdown.subParser('makehtml.codeBlocks')(text, options, globals);
    text = showdown.subParser('makehtml.tables')(text, options, globals);

    // We already ran _HashHTMLBlocks() before, in Markdown(), but that
    // was to escape raw HTML in the original Markdown source. This time,
    // we're escaping the markup we've just created, so that we don't wrap
    // <p> tags around block-level tags.
    text = showdown.subParser('makehtml.hashHTMLBlocks')(text, options, globals);
    text = showdown.subParser('makehtml.paragraphs')(text, options, globals);

    text = globals.converter._dispatch('makehtml.blockGamut.after', text, options, globals).getText();

    return text;
  });

  showdown.subParser('makehtml.blockQuotes', function (text, options, globals) {
    'use strict';

    text = globals.converter._dispatch('makehtml.blockQuotes.before', text, options, globals).getText();

    // add a couple extra lines after the text and endtext mark
    text = text + '\n\n';

    var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;

    if (options.splitAdjacentBlockquotes) {
      rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
    }

    text = text.replace(rgx, function (bq) {
      // attacklab: hack around Konqueror 3.5.4 bug:
      // "----------bug".replace(/^-/g,"") == "bug"
      bq = bq.replace(/^[ \t]*>[ \t]?/gm, ''); // trim one level of quoting

      // attacklab: clean up hack
      bq = bq.replace(/¨0/g, '');

      bq = bq.replace(/^[ \t]+$/gm, ''); // trim whitespace-only lines
      bq = showdown.subParser('makehtml.githubCodeBlocks')(bq, options, globals);
      bq = showdown.subParser('makehtml.blockGamut')(bq, options, globals); // recurse

      bq = bq.replace(/(^|\n)/g, '$1  ');
      // These leading spaces screw with <pre> content, so we need to fix that:
      bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
        var pre = m1;
        // attacklab: hack around Konqueror 3.5.4 bug:
        pre = pre.replace(/^  /mg, '¨0');
        pre = pre.replace(/¨0/g, '');
        return pre;
      });

      return showdown.subParser('makehtml.hashBlock')('<blockquote>\n' + bq + '\n</blockquote>', options, globals);
    });

    text = globals.converter._dispatch('makehtml.blockQuotes.after', text, options, globals).getText();
    return text;
  });

  /**
   * Process Markdown `<pre><code>` blocks.
   */
  showdown.subParser('makehtml.codeBlocks', function (text, options, globals) {
    'use strict';

    text = globals.converter._dispatch('makehtml.codeBlocks.before', text, options, globals).getText();

    // sentinel workarounds for lack of \A and \Z, safari\khtml bug
    text += '¨0';

    var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
    text = text.replace(pattern, function (wholeMatch, m1, m2) {
      var codeblock = m1,
        nextChar = m2,
        end = '\n';

      codeblock = showdown.subParser('makehtml.outdent')(codeblock, options, globals);
      codeblock = showdown.subParser('makehtml.encodeCode')(codeblock, options, globals);
      codeblock = showdown.subParser('makehtml.detab')(codeblock, options, globals);
      codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
      codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing newlines

      if (options.omitExtraWLInCodeBlocks) {
        end = '';
      }

      codeblock = '<pre><code>' + codeblock + end + '</code></pre>';

      return showdown.subParser('makehtml.hashBlock')(codeblock, options, globals) + nextChar;
    });

    // strip sentinel
    text = text.replace(/¨0/, '');

    text = globals.converter._dispatch('makehtml.codeBlocks.after', text, options, globals).getText();
    return text;
  });

  /**
   *
   *   *  Backtick quotes are used for <code></code> spans.
   *
   *   *  You can use multiple backticks as the delimiters if you want to
   *     include literal backticks in the code span. So, this input:
   *
   *         Just type ``foo `bar` baz`` at the prompt.
   *
   *       Will translate to:
   *
   *         <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
   *
   *    There's no arbitrary limit to the number of backticks you
   *    can use as delimters. If you need three consecutive backticks
   *    in your code, use four for delimiters, etc.
   *
   *  *  You can use spaces to get literal backticks at the edges:
   *
   *         ... type `` `bar` `` ...
   *
   *       Turns to:
   *
   *         ... type <code>`bar`</code> ...
   */
  showdown.subParser('makehtml.codeSpans', function (text, options, globals) {
    'use strict';

    text = globals.converter._dispatch('makehtml.codeSpans.before', text, options, globals).getText();

    if (typeof (text) === 'undefined') {
      text = '';
    }
    text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
      function (wholeMatch, m1, m2, m3) {
        var c = m3;
        c = c.replace(/^([ \t]*)/g, '');	// leading whitespace
        c = c.replace(/[ \t]*$/g, '');	// trailing whitespace
        c = showdown.subParser('makehtml.encodeCode')(c, options, globals);
        c = m1 + '<code>' + c + '</code>';
        c = showdown.subParser('makehtml.hashHTMLSpans')(c, options, globals);
        return c;
      }
    );

    text = globals.converter._dispatch('makehtml.codeSpans.after', text, options, globals).getText();
    return text;
  });

  /**
   * Create a full HTML document from the processed markdown
   */
  showdown.subParser('makehtml.completeHTMLDocument', function (text, options, globals) {
    'use strict';

    if (!options.completeHTMLDocument) {
      return text;
    }

    text = globals.converter._dispatch('makehtml.completeHTMLDocument.before', text, options, globals).getText();

    var doctype = 'html',
      doctypeParsed = '<!DOCTYPE HTML>\n',
      title = '',
      charset = '<meta charset="utf-8">\n',
      lang = '',
      metadata = '';

    if (typeof globals.metadata.parsed.doctype !== 'undefined') {
      doctypeParsed = '<!DOCTYPE ' + globals.metadata.parsed.doctype + '>\n';
      doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
      if (doctype === 'html' || doctype === 'html5') {
        charset = '<meta charset="utf-8">';
      }
    }

    for (var meta in globals.metadata.parsed) {
      if (globals.metadata.parsed.hasOwnProperty(meta)) {
        switch (meta.toLowerCase()) {
          case 'doctype':
            break;

          case 'title':
            title = '<title>' + globals.metadata.parsed.title + '</title>\n';
            break;

          case 'charset':
            if (doctype === 'html' || doctype === 'html5') {
              charset = '<meta charset="' + globals.metadata.parsed.charset + '">\n';
            } else {
              charset = '<meta name="charset" content="' + globals.metadata.parsed.charset + '">\n';
            }
            break;

          case 'language':
          case 'lang':
            lang = ' lang="' + globals.metadata.parsed[meta] + '"';
            metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
            break;

          default:
            metadata += '<meta name="' + meta + '" content="' + globals.metadata.parsed[meta] + '">\n';
        }
      }
    }

    text = doctypeParsed + '<html' + lang + '>\n<head>\n' + title + charset + metadata + '</head>\n<body>\n' + text.trim() + '\n</body>\n</html>';

    text = globals.converter._dispatch('makehtml.completeHTMLDocument.after', text, options, globals).getText();
    return text;
  });

  /**
   * Convert all tabs to spaces
   */
  showdown.subParser('makehtml.detab', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.detab.before', text, options, globals).getText();

    // expand first n-1 tabs
    text = text.replace(/\t(?=\t)/g, '    '); // g_tab_width

    // replace the nth with two sentinels
    text = text.replace(/\t/g, '¨A¨B');

    // use the sentinel to anchor our regex so it doesn't explode
    text = text.replace(/¨B(.+?)¨A/g, function (wholeMatch, m1) {
      var leadingText = m1,
        numSpaces = 4 - leadingText.length % 4;  // g_tab_width

      // there *must* be a better way to do this:
      for (var i = 0; i < numSpaces; i++) {
        leadingText += ' ';
      }

      return leadingText;
    });

    // clean up sentinels
    text = text.replace(/¨A/g, '    ');  // g_tab_width
    text = text.replace(/¨B/g, '');

    text = globals.converter._dispatch('makehtml.detab.after', text, options, globals).getText();
    return text;
  });

  showdown.subParser('makehtml.ellipsis', function (text, options, globals) {
    'use strict';

    if (!options.ellipsis) {
      return text;
    }

    text = globals.converter._dispatch('makehtml.ellipsis.before', text, options, globals).getText();

    text = text.replace(/\.\.\./g, '…');

    text = globals.converter._dispatch('makehtml.ellipsis.after', text, options, globals).getText();

    return text;
  });

  /**
   * Turn emoji codes into emojis
   *
   * List of supported emojis: https://github.com/showdownjs/showdown/wiki/Emojis
   */
  showdown.subParser('makehtml.emoji', function (text, options, globals) {
    'use strict';

    if (!options.emoji) {
      return text;
    }

    text = globals.converter._dispatch('makehtml.emoji.before', text, options, globals).getText();

    var emojiRgx = /:([\S]+?):/g;

    text = text.replace(emojiRgx, function (wm, emojiCode) {
      if (showdown.helper.emojis.hasOwnProperty(emojiCode)) {
        return showdown.helper.emojis[emojiCode];
      }
      return wm;
    });

    text = globals.converter._dispatch('makehtml.emoji.after', text, options, globals).getText();

    return text;
  });

  /**
   * Smart processing for ampersands and angle brackets that need to be encoded.
   */
  showdown.subParser('makehtml.encodeAmpsAndAngles', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.encodeAmpsAndAngles.before', text, options, globals).getText();

    // Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
    // http://bumppo.net/projects/amputator/
    text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, '&amp;');

    // Encode naked <'s
    text = text.replace(/<(?![a-z\/?$!])/gi, '&lt;');

    // Encode <
    text = text.replace(/</g, '&lt;');

    // Encode >
    text = text.replace(/>/g, '&gt;');

    text = globals.converter._dispatch('makehtml.encodeAmpsAndAngles.after', text, options, globals).getText();
    return text;
  });

  /**
   * Returns the string, with after processing the following backslash escape sequences.
   *
   * attacklab: The polite way to do this is with the new escapeCharacters() function:
   *
   *    text = escapeCharacters(text,"\\",true);
   *    text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);
   *
   * ...but we're sidestepping its use of the (slow) RegExp constructor
   * as an optimization for Firefox.  This function gets called a LOT.
   */
  showdown.subParser('makehtml.encodeBackslashEscapes', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.encodeBackslashEscapes.before', text, options, globals).getText();

    text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
    text = text.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, showdown.helper.escapeCharactersCallback);

    text = globals.converter._dispatch('makehtml.encodeBackslashEscapes.after', text, options, globals).getText();
    return text;
  });

  /**
   * Encode/escape certain characters inside Markdown code runs.
   * The point is that in code, these characters are literals,
   * and lose their special Markdown meanings.
   */
  showdown.subParser('makehtml.encodeCode', function (text, options, globals) {
    'use strict';

    text = globals.converter._dispatch('makehtml.encodeCode.before', text, options, globals).getText();

    // Encode all ampersands; HTML entities are not
    // entities within a Markdown code span.
    text = text
      .replace(/&/g, '&amp;')
      // Do the angle bracket song and dance:
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Now, escape characters that are magic in Markdown:
      .replace(/([*_{}\[\]\\=~-])/g, showdown.helper.escapeCharactersCallback);

    text = globals.converter._dispatch('makehtml.encodeCode.after', text, options, globals).getText();
    return text;
  });

  /**
   * Within tags -- meaning between < and > -- encode [\ ` * _ ~ =] so they
   * don't conflict with their use in Markdown for code, italics and strong.
   */
  showdown.subParser('makehtml.escapeSpecialCharsWithinTagAttributes', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.escapeSpecialCharsWithinTagAttributes.before', text, options, globals).getText();

    // Build a regex to find HTML tags.
    var tags = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi,
      comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;

    text = text.replace(tags, function (wholeMatch) {
      return wholeMatch
        .replace(/(.)<\/?code>(?=.)/g, '$1`')
        .replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
    });

    text = text.replace(comments, function (wholeMatch) {
      return wholeMatch
        .replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
    });

    text = globals.converter._dispatch('makehtml.escapeSpecialCharsWithinTagAttributes.after', text, options, globals).getText();
    return text;
  });

  /**
   * Handle github codeblocks prior to running HashHTML so that
   * HTML contained within the codeblock gets escaped properly
   * Example:
   * ```ruby
   *     def hello_world(x)
   *       puts "Hello, #{x}"
   *     end
   * ```
   */
  showdown.subParser('makehtml.githubCodeBlocks', function (text, options, globals) {
    'use strict';

    // early exit if option is not enabled
    if (!options.ghCodeBlocks) {
      return text;
    }

    text = globals.converter._dispatch('makehtml.githubCodeBlocks.before', text, options, globals).getText();

    text += '¨0';

    text = text.replace(/(?:^|\n) {0,3}(```+|~~~+) *([^\n\t`~]*)\n([\s\S]*?)\n {0,3}\1/g, function (wholeMatch, delim, language, codeblock) {
      var end = (options.omitExtraWLInCodeBlocks) ? '' : '\n';

      // if the language has spaces followed by some other chars, according to the spec we should just ignore everything
      // after the first space
      language = language.trim().split(' ')[0];

      // First parse the github code block
      codeblock = showdown.subParser('makehtml.encodeCode')(codeblock, options, globals);
      codeblock = showdown.subParser('makehtml.detab')(codeblock, options, globals);
      codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
      codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing whitespace

      codeblock = '<pre><code' + (language ? ' class="' + language + ' language-' + language + '"' : '') + '>' + codeblock + end + '</code></pre>';

      codeblock = showdown.subParser('makehtml.hashBlock')(codeblock, options, globals);

      // Since GHCodeblocks can be false positives, we need to
      // store the primitive text and the parsed text in a global var,
      // and then return a token
      return '\n\n¨G' + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock: codeblock }) - 1) + 'G\n\n';
    });

    // attacklab: strip sentinel
    text = text.replace(/¨0/, '');

    return globals.converter._dispatch('makehtml.githubCodeBlocks.after', text, options, globals).getText();
  });

  showdown.subParser('makehtml.hashBlock', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.hashBlock.before', text, options, globals).getText();
    text = text.replace(/(^\n+|\n+$)/g, '');
    text = '\n\n¨K' + (globals.gHtmlBlocks.push(text) - 1) + 'K\n\n';
    text = globals.converter._dispatch('makehtml.hashBlock.after', text, options, globals).getText();
    return text;
  });

  /**
   * Hash and escape <code> elements that should not be parsed as markdown
   */
  showdown.subParser('makehtml.hashCodeTags', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.hashCodeTags.before', text, options, globals).getText();

    var repFunc = function (wholeMatch, match, left, right) {
      var codeblock = left + showdown.subParser('makehtml.encodeCode')(match, options, globals) + right;
      return '¨C' + (globals.gHtmlSpans.push(codeblock) - 1) + 'C';
    };

    // Hash naked <code>
    text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '<code\\b[^>]*>', '</code>', 'gim');

    text = globals.converter._dispatch('makehtml.hashCodeTags.after', text, options, globals).getText();
    return text;
  });

  showdown.subParser('makehtml.hashElement', function (text, options, globals) {
    'use strict';

    return function (wholeMatch, m1) {
      var blockText = m1;

      // Undo double lines
      blockText = blockText.replace(/\n\n/g, '\n');
      blockText = blockText.replace(/^\n/, '');

      // strip trailing blank lines
      blockText = blockText.replace(/\n+$/g, '');

      // Replace the element text with a marker ("¨KxK" where x is its key)
      blockText = '\n\n¨K' + (globals.gHtmlBlocks.push(blockText) - 1) + 'K\n\n';

      return blockText;
    };
  });

  showdown.subParser('makehtml.hashHTMLBlocks', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.hashHTMLBlocks.before', text, options, globals).getText();

    var blockTags = [
      'pre',
      'div',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'table',
      'dl',
      'ol',
      'ul',
      'script',
      'noscript',
      'form',
      'fieldset',
      'iframe',
      'math',
      'style',
      'section',
      'header',
      'footer',
      'nav',
      'article',
      'aside',
      'address',
      'audio',
      'canvas',
      'figure',
      'hgroup',
      'output',
      'video',
      'details',
      'p'
    ],
      repFunc = function (wholeMatch, match, left, right) {
        var txt = wholeMatch;
        // check if this html element is marked as markdown
        // if so, it's contents should be parsed as markdown
        if (left.search(/\bmarkdown\b/) !== -1) {
          txt = left + globals.converter.makeHtml(match) + right;
        }
        return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
      };

    if (options.backslashEscapesHTMLTags) {
      // encode backslash escaped HTML tags
      text = text.replace(/\\<(\/?[^>]+?)>/g, function (wm, inside) {
        return '&lt;' + inside + '&gt;';
      });
    }

    // hash HTML Blocks
    for (var i = 0; i < blockTags.length; ++i) {

      var opTagPos,
        rgx1 = new RegExp('^ {0,3}(<' + blockTags[i] + '\\b[^>]*>)', 'im'),
        patLeft = '<' + blockTags[i] + '\\b[^>]*>',
        patRight = '</' + blockTags[i] + '>';
      // 1. Look for the first position of the first opening HTML tag in the text
      while ((opTagPos = showdown.helper.regexIndexOf(text, rgx1)) !== -1) {

        // if the HTML tag is \ escaped, we need to escape it and break


        //2. Split the text in that position
        var subTexts = showdown.helper.splitAtIndex(text, opTagPos),
          //3. Match recursively
          newSubText1 = showdown.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, 'im');

        // prevent an infinite loop
        if (newSubText1 === subTexts[1]) {
          break;
        }
        text = subTexts[0].concat(newSubText1);
      }
    }
    // HR SPECIAL CASE
    text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
      showdown.subParser('makehtml.hashElement')(text, options, globals));

    // Special case for standalone HTML comments
    text = showdown.helper.replaceRecursiveRegExp(text, function (txt) {
      return '\n\n¨K' + (globals.gHtmlBlocks.push(txt) - 1) + 'K\n\n';
    }, '^ {0,3}<!--', '-->', 'gm');

    // PHP and ASP-style processor instructions (<?...?> and <%...%>)
    text = text.replace(/\n\n( {0,3}<([?%])[^\r]*?\2>[ \t]*(?=\n{2,}))/g,
      showdown.subParser('makehtml.hashElement')(text, options, globals));

    text = globals.converter._dispatch('makehtml.hashHTMLBlocks.after', text, options, globals).getText();
    return text;
  });

  /**
   * Hash span elements that should not be parsed as markdown
   */
  showdown.subParser('makehtml.hashHTMLSpans', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.hashHTMLSpans.before', text, options, globals).getText();

    // Hash Self Closing tags
    text = text.replace(/<[^>]+?\/>/gi, function (wm) {
      return showdown.helper._hashHTMLSpan(wm, globals);
    });

    // Hash tags without properties
    text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function (wm) {
      return showdown.helper._hashHTMLSpan(wm, globals);
    });

    // Hash tags with properties
    text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function (wm) {
      return showdown.helper._hashHTMLSpan(wm, globals);
    });

    // Hash self closing tags without />
    text = text.replace(/<[^>]+?>/gi, function (wm) {
      return showdown.helper._hashHTMLSpan(wm, globals);
    });

    text = globals.converter._dispatch('makehtml.hashHTMLSpans.after', text, options, globals).getText();
    return text;
  });

  /**
   * Unhash HTML spans
   */
  showdown.subParser('makehtml.unhashHTMLSpans', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.unhashHTMLSpans.before', text, options, globals).getText();

    for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
      var repText = globals.gHtmlSpans[i],
        // limiter to prevent infinite loop (assume 10 as limit for recurse)
        limit = 0;

      while (/¨C(\d+)C/.test(repText)) {
        var num = RegExp.$1;
        repText = repText.replace('¨C' + num + 'C', globals.gHtmlSpans[num]);
        if (limit === 10) {
          console.error('maximum nesting of 10 spans reached!!!');
          break;
        }
        ++limit;
      }
      text = text.replace('¨C' + i + 'C', repText);
    }

    text = globals.converter._dispatch('makehtml.unhashHTMLSpans.after', text, options, globals).getText();
    return text;
  });

  /**
   * Hash and escape <pre><code> elements that should not be parsed as markdown
   */
  showdown.subParser('makehtml.hashPreCodeTags', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.hashPreCodeTags.before', text, options, globals).getText();

    var repFunc = function (wholeMatch, match, left, right) {
      // encode html entities
      var codeblock = left + showdown.subParser('makehtml.encodeCode')(match, options, globals) + right;
      return '\n\n¨G' + (globals.ghCodeBlocks.push({ text: wholeMatch, codeblock: codeblock }) - 1) + 'G\n\n';
    };

    // Hash <pre><code>
    text = showdown.helper.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^ {0,3}</code>\\s*</pre>', 'gim');

    text = globals.converter._dispatch('makehtml.hashPreCodeTags.after', text, options, globals).getText();
    return text;
  });

  showdown.subParser('makehtml.headers', function (text, options, globals) {
    'use strict';

    text = globals.converter._dispatch('makehtml.headers.before', text, options, globals).getText();

    var headerLevelStart = (isNaN(parseInt(options.headerLevelStart))) ? 1 : parseInt(options.headerLevelStart),

      // Set text-style headers:
      //	Header 1
      //	========
      //
      //	Header 2
      //	--------
      //
      setextRegexH1 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm,
      setextRegexH2 = (options.smoothLivePreview) ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;

    text = text.replace(setextRegexH1, function (wholeMatch, m1) {

      var spanGamut = showdown.subParser('makehtml.spanGamut')(m1, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
        hLevel = headerLevelStart,
        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
      return showdown.subParser('makehtml.hashBlock')(hashBlock, options, globals);
    });

    text = text.replace(setextRegexH2, function (matchFound, m1) {
      var spanGamut = showdown.subParser('makehtml.spanGamut')(m1, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m1) + '"',
        hLevel = headerLevelStart + 1,
        hashBlock = '<h' + hLevel + hID + '>' + spanGamut + '</h' + hLevel + '>';
      return showdown.subParser('makehtml.hashBlock')(hashBlock, options, globals);
    });

    // atx-style headers:
    //  # Header 1
    //  ## Header 2
    //  ## Header 2 with closing hashes ##
    //  ...
    //  ###### Header 6
    //
    var atxStyle = (options.requireSpaceBeforeHeadingText) ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;

    text = text.replace(atxStyle, function (wholeMatch, m1, m2) {
      var hText = m2;
      if (options.customizedHeaderId) {
        hText = m2.replace(/\s?{([^{]+?)}\s*$/, '');
      }

      var span = showdown.subParser('makehtml.spanGamut')(hText, options, globals),
        hID = (options.noHeaderId) ? '' : ' id="' + headerId(m2) + '"',
        hLevel = headerLevelStart - 1 + m1.length,
        header = '<h' + hLevel + hID + '>' + span + '</h' + hLevel + '>';

      return showdown.subParser('makehtml.hashBlock')(header, options, globals);
    });

    function headerId(m) {
      var title,
        prefix;

      // It is separate from other options to allow combining prefix and customized
      if (options.customizedHeaderId) {
        var match = m.match(/{([^{]+?)}\s*$/);
        if (match && match[1]) {
          m = match[1];
        }
      }

      title = m;

      // Prefix id to prevent causing inadvertent pre-existing style matches.
      if (showdown.helper.isString(options.prefixHeaderId)) {
        prefix = options.prefixHeaderId;
      } else if (options.prefixHeaderId === true) {
        prefix = 'section-';
      } else {
        prefix = '';
      }

      if (!options.rawPrefixHeaderId) {
        title = prefix + title;
      }

      if (options.ghCompatibleHeaderId) {
        title = title
          .replace(/ /g, '-')
          // replace previously escaped chars (&, ¨ and $)
          .replace(/&amp;/g, '')
          .replace(/¨T/g, '')
          .replace(/¨D/g, '')
          // replace rest of the chars (&~$ are repeated as they might have been escaped)
          // borrowed from github's redcarpet (some they should produce similar results)
          .replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, '')
          .toLowerCase();
      } else if (options.rawHeaderId) {
        title = title
          .replace(/ /g, '-')
          // replace previously escaped chars (&, ¨ and $)
          .replace(/&amp;/g, '&')
          .replace(/¨T/g, '¨')
          .replace(/¨D/g, '$')
          // replace " and '
          .replace(/["']/g, '-')
          .toLowerCase();
      } else {
        title = title
          .replace(/[^\w]/g, '')
          .toLowerCase();
      }

      if (options.rawPrefixHeaderId) {
        title = prefix + title;
      }

      if (globals.hashLinkCounts[title]) {
        title = title + '-' + (globals.hashLinkCounts[title]++);
      } else {
        globals.hashLinkCounts[title] = 1;
      }
      return title;
    }

    text = globals.converter._dispatch('makehtml.headers.after', text, options, globals).getText();
    return text;
  });

  /**
   * Turn Markdown horizontal rule shortcuts into <hr /> tags.
   *
   * Any 3 or more unindented consecutive hyphens, asterisks or underscores with or without a space beetween them
   * in a single line is considered a horizontal rule
   */
  showdown.subParser('makehtml.horizontalRule', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.horizontalRule.before', text, options, globals).getText();

    var key = showdown.subParser('makehtml.hashBlock')('<hr />', options, globals);
    text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
    text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
    text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);

    text = globals.converter._dispatch('makehtml.horizontalRule.after', text, options, globals).getText();
    return text;
  });

  /**
   * Turn Markdown image shortcuts into <img> tags.
   */
  showdown.subParser('makehtml.images', function (text, options, globals) {
    'use strict';

    text = globals.converter._dispatch('makehtml.images.before', text, options, globals).getText();

    var inlineRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
      crazyRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g,
      base64RegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g,
      referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g,
      refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;

    function writeImageTagBase64(wholeMatch, altText, linkId, url, width, height, m5, title) {
      url = url.replace(/\s/g, '');
      return writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title);
    }

    function writeImageTagBaseUrl(wholeMatch, altText, linkId, url, width, height, m5, title) {
      url = showdown.helper.applyBaseUrl(options.relativePathBaseUrl, url);

      return writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title);
    }

    function writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title) {

      var gUrls = globals.gUrls,
        gTitles = globals.gTitles,
        gDims = globals.gDimensions;

      linkId = linkId.toLowerCase();

      if (!title) {
        title = '';
      }
      // Special case for explicit empty url
      if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
        url = '';

      } else if (url === '' || url === null) {
        if (linkId === '' || linkId === null) {
          // lower-case and turn embedded newlines into spaces
          linkId = altText.toLowerCase().replace(/ ?\n/g, ' ');
        }
        url = '#' + linkId;

        if (!showdown.helper.isUndefined(gUrls[linkId])) {
          url = gUrls[linkId];
          if (!showdown.helper.isUndefined(gTitles[linkId])) {
            title = gTitles[linkId];
          }
          if (!showdown.helper.isUndefined(gDims[linkId])) {
            width = gDims[linkId].width;
            height = gDims[linkId].height;
          }
        } else {
          return wholeMatch;
        }
      }

      altText = altText
        .replace(/"/g, '&quot;')
        //altText = showdown.helper.escapeCharacters(altText, '*_', false);
        .replace(showdown.helper.regexes.asteriskDashTildeAndColon, showdown.helper.escapeCharactersCallback);
      //url = showdown.helper.escapeCharacters(url, '*_', false);
      url = url.replace(showdown.helper.regexes.asteriskDashTildeAndColon, showdown.helper.escapeCharactersCallback);
      var result = '<img src="' + url + '" alt="' + altText + '"';

      if (title && showdown.helper.isString(title)) {
        title = title
          .replace(/"/g, '&quot;')
          //title = showdown.helper.escapeCharacters(title, '*_', false);
          .replace(showdown.helper.regexes.asteriskDashTildeAndColon, showdown.helper.escapeCharactersCallback);
        result += ' title="' + title + '"';
      }

      if (width && height) {
        width = (width === '*') ? 'auto' : width;
        height = (height === '*') ? 'auto' : height;

        result += ' width="' + width + '"';
        result += ' height="' + height + '"';
      }

      result += ' />';

      return result;
    }

    // First, handle reference-style labeled images: ![alt text][id]
    text = text.replace(referenceRegExp, writeImageTag);

    // Next, handle inline images:  ![alt text](url =<width>x<height> "optional title")

    // base64 encoded images
    text = text.replace(base64RegExp, writeImageTagBase64);

    // cases with crazy urls like ./image/cat1).png
    text = text.replace(crazyRegExp, writeImageTagBaseUrl);

    // normal cases
    text = text.replace(inlineRegExp, writeImageTagBaseUrl);

    // handle reference-style shortcuts: ![img text]
    text = text.replace(refShortcutRegExp, writeImageTag);

    text = globals.converter._dispatch('makehtml.images.after', text, options, globals).getText();
    return text;
  });

  showdown.subParser('makehtml.italicsAndBold', function (text, options, globals) {
    'use strict';

    text = globals.converter._dispatch('makehtml.italicsAndBold.before', text, options, globals).getText();

    // it's faster to have 3 separate regexes for each case than have just one
    // because of backtracing, in some cases, it could lead to an exponential effect
    // called "catastrophic backtrace". Ominous!

    function parseInside(txt, left, right) {
      return left + txt + right;
    }

    // Parse underscores
    if (options.literalMidWordUnderscores) {
      text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function (wm, txt) {
        return parseInside(txt, '<strong><em>', '</em></strong>');
      });
      text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function (wm, txt) {
        return parseInside(txt, '<strong>', '</strong>');
      });
      text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function (wm, txt) {
        return parseInside(txt, '<em>', '</em>');
      });
    } else {
      text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
        return (/\S$/.test(m)) ? parseInside(m, '<strong><em>', '</em></strong>') : wm;
      });
      text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
        return (/\S$/.test(m)) ? parseInside(m, '<strong>', '</strong>') : wm;
      });
      text = text.replace(/_([^\s_][\s\S]*?)_/g, function (wm, m) {
        // !/^_[^_]/.test(m) - test if it doesn't start with __ (since it seems redundant, we removed it)
        return (/\S$/.test(m)) ? parseInside(m, '<em>', '</em>') : wm;
      });
    }

    // Now parse asterisks
    /*
    if (options.literalMidWordAsterisks) {
      text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]+?)\*\*\*\B(?!\*)/g, function (wm, lead, txt) {
        return parseInside (txt, lead + '<strong><em>', '</em></strong>');
      });
      text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]+?)\*\*\B(?!\*)/g, function (wm, lead, txt) {
        return parseInside (txt, lead + '<strong>', '</strong>');
      });
      text = text.replace(/([^*]|^)\B\*(\S[\s\S]+?)\*\B(?!\*)/g, function (wm, lead, txt) {
        return parseInside (txt, lead + '<em>', '</em>');
      });
    } else {
    */
    text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside(m, '<strong><em>', '</em></strong>') : wm;
    });
    text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function (wm, m) {
      return (/\S$/.test(m)) ? parseInside(m, '<strong>', '</strong>') : wm;
    });
    text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function (wm, m) {
      // !/^\*[^*]/.test(m) - test if it doesn't start with ** (since it seems redundant, we removed it)
      return (/\S$/.test(m)) ? parseInside(m, '<em>', '</em>') : wm;
    });
    //}

    text = globals.converter._dispatch('makehtml.italicsAndBold.after', text, options, globals).getText();
    return text;
  });

  ////
  // makehtml/links.js
  // Copyright (c) 2018 ShowdownJS
  //
  // Transforms MD links into `<a>` html anchors
  //
  // A link contains link text (the visible text), a link destination (the URI that is the link destination), and
  // optionally a link title. There are two basic kinds of links in Markdown.
  // In inline links the destination and title are given immediately after the link text.
  // In reference links the destination and title are defined elsewhere in the document.
  //
  // ***Author:***
  // - Estevão Soares dos Santos (Tivie) <https://github.com/tivie>
  ////

  (function () {
    /**
     * Helper function: Wrapper function to pass as second replace parameter
     *
     * @param {RegExp} rgx
     * @param {string} evtRootName
     * @param {{}} options
     * @param {{}} globals
     * @returns {Function}
     */
    function replaceAnchorTagReference(rgx, evtRootName, options, globals, emptyCase) {
      emptyCase = !!emptyCase;
      return function (wholeMatch, text, id, url, m5, m6, title) {
        // bail we we find 2 newlines somewhere
        if (/\n\n/.test(wholeMatch)) {
          return wholeMatch;
        }

        var evt = createEvent(rgx, evtRootName + '.captureStart', wholeMatch, text, id, url, title, options, globals);
        return writeAnchorTag(evt, options, globals, emptyCase);
      };
    }

    function replaceAnchorTagBaseUrl(rgx, evtRootName, options, globals, emptyCase) {
      return function (wholeMatch, text, id, url, m5, m6, title) {
        url = showdown.helper.applyBaseUrl(options.relativePathBaseUrl, url);

        var evt = createEvent(rgx, evtRootName + '.captureStart', wholeMatch, text, id, url, title, options, globals);
        return writeAnchorTag(evt, options, globals, emptyCase);
      };
    }

    /**
     * TODO Normalize this
     * Helper function: Create a capture event
     * @param {RegExp} rgx
     * @param {String} evtName Event name
     * @param {String} wholeMatch
     * @param {String} text
     * @param {String} id
     * @param {String} url
     * @param {String} title
     * @param {{}} options
     * @param {{}} globals
     * @returns {showdown.helper.Event|*}
     */
    function createEvent(rgx, evtName, wholeMatch, text, id, url, title, options, globals) {
      return globals.converter._dispatch(evtName, wholeMatch, options, globals, {
        regexp: rgx,
        matches: {
          wholeMatch: wholeMatch,
          text: text,
          id: id,
          url: url,
          title: title
        }
      });
    }

    /**
     * Helper Function: Normalize and write an anchor tag based on passed parameters
     * @param evt
     * @param options
     * @param globals
     * @param {boolean} emptyCase
     * @returns {string}
     */
    function writeAnchorTag(evt, options, globals, emptyCase) {

      var wholeMatch = evt.getMatches().wholeMatch;
      var text = evt.getMatches().text;
      var id = evt.getMatches().id;
      var url = evt.getMatches().url;
      var title = evt.getMatches().title;
      var target = '';

      if (!title) {
        title = '';
      }
      id = (id) ? id.toLowerCase() : '';

      if (emptyCase) {
        url = '';
      } else if (!url) {
        if (!id) {
          // lower-case and turn embedded newlines into spaces
          id = text.toLowerCase().replace(/ ?\n/g, ' ');
        }
        url = '#' + id;

        if (!showdown.helper.isUndefined(globals.gUrls[id])) {
          url = globals.gUrls[id];
          if (!showdown.helper.isUndefined(globals.gTitles[id])) {
            title = globals.gTitles[id];
          }
        } else {
          return wholeMatch;
        }
      }
      //url = showdown.helper.escapeCharacters(url, '*_:~', false); // replaced line to improve performance
      url = url.replace(showdown.helper.regexes.asteriskDashTildeAndColon, showdown.helper.escapeCharactersCallback);

      if (title !== '' && title !== null) {
        title = title.replace(/"/g, '&quot;');
        //title = showdown.helper.escapeCharacters(title, '*_', false); // replaced line to improve performance
        title = title.replace(showdown.helper.regexes.asteriskDashTildeAndColon, showdown.helper.escapeCharactersCallback);
        title = ' title="' + title + '"';
      }

      // optionLinksInNewWindow only applies
      // to external links. Hash links (#) open in same page
      if (options.openLinksInNewWindow && !/^#/.test(url)) {
        // escaped _
        target = ' rel="noopener noreferrer" target="¨E95Eblank"';
      }

      // Text can be a markdown element, so we run through the appropriate parsers
      text = showdown.subParser('makehtml.codeSpans')(text, options, globals);
      text = showdown.subParser('makehtml.emoji')(text, options, globals);
      text = showdown.subParser('makehtml.underline')(text, options, globals);
      text = showdown.subParser('makehtml.italicsAndBold')(text, options, globals);
      text = showdown.subParser('makehtml.strikethrough')(text, options, globals);
      text = showdown.subParser('makehtml.ellipsis')(text, options, globals);
      text = showdown.subParser('makehtml.hashHTMLSpans')(text, options, globals);

      //evt = createEvent(rgx, evtRootName + '.captureEnd', wholeMatch, text, id, url, title, options, globals);

      var result = '<a href="' + url + '"' + title + target + '>' + text + '</a>';

      //evt = createEvent(rgx, evtRootName + '.beforeHash', wholeMatch, text, id, url, title, options, globals);

      result = showdown.subParser('makehtml.hashHTMLSpans')(result, options, globals);

      return result;
    }

    var evtRootName = 'makehtml.links';

    /**
     * Turn Markdown link shortcuts into XHTML <a> tags.
     */
    showdown.subParser('makehtml.links', function (text, options, globals) {

      text = globals.converter._dispatch(evtRootName + '.start', text, options, globals).getText();

      // 1. Handle reference-style links: [link text] [id]
      text = showdown.subParser('makehtml.links.reference')(text, options, globals);

      // 2. Handle inline-style links: [link text](url "optional title")
      text = showdown.subParser('makehtml.links.inline')(text, options, globals);

      // 3. Handle reference-style shortcuts: [link text]
      // These must come last in case there's a [link text][1] or [link text](/foo)
      text = showdown.subParser('makehtml.links.referenceShortcut')(text, options, globals);

      // 4. Handle angle brackets links -> `<http://example.com/>`
      // Must come after links, because you can use < and > delimiters in inline links like [this](<url>).
      text = showdown.subParser('makehtml.links.angleBrackets')(text, options, globals);

      // 5. Handle GithubMentions (if option is enabled)
      text = showdown.subParser('makehtml.links.ghMentions')(text, options, globals);

      // 6. Handle <a> tags and img tags
      text = text.replace(/<a\s[^>]*>[\s\S]*<\/a>/g, function (wholeMatch) {
        return showdown.helper._hashHTMLSpan(wholeMatch, globals);
      });

      text = text.replace(/<img\s[^>]*\/?>/g, function (wholeMatch) {
        return showdown.helper._hashHTMLSpan(wholeMatch, globals);
      });

      // 7. Handle naked links (if option is enabled)
      text = showdown.subParser('makehtml.links.naked')(text, options, globals);

      text = globals.converter._dispatch(evtRootName + '.end', text, options, globals).getText();
      return text;
    });

    /**
     * TODO WRITE THIS DOCUMENTATION
     */
    showdown.subParser('makehtml.links.inline', function (text, options, globals) {
      var evtRootName = evtRootName + '.inline';

      text = globals.converter._dispatch(evtRootName + '.start', text, options, globals).getText();

      // 1. Look for empty cases: []() and [empty]() and []("title")
      var rgxEmpty = /\[(.*?)]()()()()\(<? ?>? ?(?:["'](.*)["'])?\)/g;
      text = text.replace(rgxEmpty, replaceAnchorTagBaseUrl(rgxEmpty, evtRootName, options, globals, true));

      // 2. Look for cases with crazy urls like ./image/cat1).png
      var rgxCrazy = /\[((?:\[[^\]]*]|[^\[\]])*)]()\s?\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g;
      text = text.replace(rgxCrazy, replaceAnchorTagBaseUrl(rgxCrazy, evtRootName, options, globals));

      // 3. inline links with no title or titles wrapped in ' or ":
      // [text](url.com) || [text](<url.com>) || [text](url.com "title") || [text](<url.com> "title")
      //var rgx2 = /\[[ ]*[\s]?[ ]*([^\n\[\]]*?)[ ]*[\s]?[ ]*] ?()\(<?[ ]*[\s]?[ ]*([^\s'"]*)>?(?:[ ]*[\n]?[ ]*()(['"])(.*?)\5)?[ ]*[\s]?[ ]*\)/; // this regex is too slow!!!
      var rgx2 = /\[([\S ]*?)]\s?()\( *<?([^\s'"]*?(?:\([\S]*?\)[\S]*?)?)>?\s*(?:()(['"])(.*?)\5)? *\)/g;
      text = text.replace(rgx2, replaceAnchorTagBaseUrl(rgx2, evtRootName, options, globals));

      // 4. inline links with titles wrapped in (): [foo](bar.com (title))
      var rgx3 = /\[([\S ]*?)]\s?()\( *<?([^\s'"]*?(?:\([\S]*?\)[\S]*?)?)>?\s+()()\((.*?)\) *\)/g;
      text = text.replace(rgx3, replaceAnchorTagBaseUrl(rgx3, evtRootName, options, globals));

      text = globals.converter._dispatch(evtRootName + '.end', text, options, globals).getText();

      return text;
    });

    /**
     * TODO WRITE THIS DOCUMENTATION
     */
    showdown.subParser('makehtml.links.reference', function (text, options, globals) {
      var evtRootName = evtRootName + '.reference';

      text = globals.converter._dispatch(evtRootName + '.start', text, options, globals).getText();

      var rgx = /\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g;
      text = text.replace(rgx, replaceAnchorTagReference(rgx, evtRootName, options, globals));

      text = globals.converter._dispatch(evtRootName + '.end', text, options, globals).getText();

      return text;
    });

    /**
     * TODO WRITE THIS DOCUMENTATION
     */
    showdown.subParser('makehtml.links.referenceShortcut', function (text, options, globals) {
      var evtRootName = evtRootName + '.referenceShortcut';

      text = globals.converter._dispatch(evtRootName + '.start', text, options, globals).getText();

      var rgx = /\[([^\[\]]+)]()()()()()/g;
      text = text.replace(rgx, replaceAnchorTagReference(rgx, evtRootName, options, globals));

      text = globals.converter._dispatch(evtRootName + '.end', text, options, globals).getText();

      return text;
    });

    /**
     * TODO WRITE THIS DOCUMENTATION
     */
    showdown.subParser('makehtml.links.ghMentions', function (text, options, globals) {
      var evtRootName = evtRootName + 'ghMentions';

      if (!options.ghMentions) {
        return text;
      }

      text = globals.converter._dispatch(evtRootName + '.start', text, options, globals).getText();

      var rgx = /(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d._-]+?[a-z\d]+)*))/gi;

      text = text.replace(rgx, function (wholeMatch, st, escape, mentions, username) {
        // bail if the mentions was escaped
        if (escape === '\\') {
          return st + mentions;
        }

        // check if options.ghMentionsLink is a string
        // TODO Validation should be done at initialization not at runtime
        if (!showdown.helper.isString(options.ghMentionsLink)) {
          throw new Error('ghMentionsLink option must be a string');
        }
        var url = options.ghMentionsLink.replace(/{u}/g, username);
        var evt = createEvent(rgx, evtRootName + '.captureStart', wholeMatch, mentions, null, url, null, options, globals);
        // captureEnd Event is triggered inside writeAnchorTag function
        return st + writeAnchorTag(evt, options, globals);
      });

      text = globals.converter._dispatch(evtRootName + '.end', text, options, globals).getText();

      return text;
    });

    /**
     * TODO WRITE THIS DOCUMENTATION
     */
    showdown.subParser('makehtml.links.angleBrackets', function (text, options, globals) {
      var evtRootName = 'makehtml.links.angleBrackets';

      text = globals.converter._dispatch(evtRootName + '.start', text, options, globals).getText();

      // 1. Parse links first
      var urlRgx = /<(((?:https?|ftp):\/\/|www\.)[^'">\s]+)>/gi;
      text = text.replace(urlRgx, function (wholeMatch, url, urlStart) {
        var text = url;
        url = (urlStart === 'www.') ? 'http://' + url : url;
        var evt = createEvent(urlRgx, evtRootName + '.captureStart', wholeMatch, text, null, url, null, options, globals);
        return writeAnchorTag(evt, options, globals);
      });

      // 2. Then Mail Addresses
      var mailRgx = /<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;
      text = text.replace(mailRgx, function (wholeMatch, mail) {
        var url = 'mailto:';
        mail = showdown.subParser('makehtml.unescapeSpecialChars')(mail, options, globals);
        if (options.encodeEmails) {
          url = showdown.helper.encodeEmailAddress(url + mail);
          mail = showdown.helper.encodeEmailAddress(mail);
        } else {
          url = url + mail;
        }
        var evt = createEvent(mailRgx, evtRootName + '.captureStart', wholeMatch, mail, null, url, null, options, globals);
        return writeAnchorTag(evt, options, globals);
      });

      text = globals.converter._dispatch(evtRootName + '.end', text, options, globals).getText();
      return text;
    });

    /**
     * TODO MAKE THIS WORK (IT'S NOT ACTIVATED)
     * TODO WRITE THIS DOCUMENTATION
     */
    showdown.subParser('makehtml.links.naked', function (text, options, globals) {
      if (!options.simplifiedAutoLink) {
        return text;
      }

      var evtRootName = 'makehtml.links.naked';

      text = globals.converter._dispatch(evtRootName + '.start', text, options, globals).getText();

      // 2. Now we check for
      // we also include leading markdown magic chars [_*~] for cases like __https://www.google.com/foobar__
      var urlRgx = /([_*~]*?)(((?:https?|ftp):\/\/|www\.)[^\s<>"'`´.-][^\s<>"'`´]*?\.[a-z\d.]+[^\s<>"']*)\1/gi;
      text = text.replace(urlRgx, function (wholeMatch, leadingMDChars, url, urlPrefix) {

        // we now will start traversing the url from the front to back, looking for punctuation chars [_*~,;:.!?\)\]]
        var len = url.length;
        var suffix = '';
        for (var i = len - 1; i >= 0; --i) {
          var char = url.charAt(i);

          if (/[_*~,;:.!?]/.test(char)) {
            // it's a punctuation char
            // we remove it from the url
            url = url.slice(0, -1);
            // and prepend it to the suffix
            suffix = char + suffix;
          } else if (/\)/.test(char)) {
            var opPar = url.match(/\(/g) || [];
            var clPar = url.match(/\)/g);

            // it's a curved parenthesis so we need to check for "balance" (kinda)
            if (opPar.length < clPar.length) {
              // there are more closing Parenthesis than opening so chop it!!!!!
              url = url.slice(0, -1);
              // and prepend it to the suffix
              suffix = char + suffix;
            } else {
              // it's (kinda) balanced so our work is done
              break;
            }
          } else if (/]/.test(char)) {
            var opPar2 = url.match(/\[/g) || [];
            var clPar2 = url.match(/\]/g);
            // it's a squared parenthesis so we need to check for "balance" (kinda)
            if (opPar2.length < clPar2.length) {
              // there are more closing Parenthesis than opening so chop it!!!!!
              url = url.slice(0, -1);
              // and prepend it to the suffix
              suffix = char + suffix;
            } else {
              // it's (kinda) balanced so our work is done
              break;
            }
          } else {
            // it's not a punctuation or a parenthesis so our work is done
            break;
          }
        }

        // we copy the treated url to the text variable
        var text = url;
        // finally, if it's a www shortcut, we prepend http
        url = (urlPrefix === 'www.') ? 'http://' + url : url;

        // url part is done so let's take care of text now
        // we need to escape the text (because of links such as www.example.com/foo__bar__baz)
        text = text.replace(showdown.helper.regexes.asteriskDashTildeAndColon, showdown.helper.escapeCharactersCallback);

        // finally we dispatch the event
        var evt = createEvent(urlRgx, evtRootName + '.captureStart', wholeMatch, text, null, url, null, options, globals);

        // and return the link tag, with the leadingMDChars and  suffix. The leadingMDChars are added at the end too because
        // we consumed those characters in the regexp
        return leadingMDChars + writeAnchorTag(evt, options, globals) + suffix + leadingMDChars;
      });

      // 2. Then mails
      var mailRgx = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi;
      text = text.replace(mailRgx, function (wholeMatch, leadingChar, mail) {
        var url = 'mailto:';
        mail = showdown.subParser('makehtml.unescapeSpecialChars')(mail, options, globals);
        if (options.encodeEmails) {
          url = showdown.helper.encodeEmailAddress(url + mail);
          mail = showdown.helper.encodeEmailAddress(mail);
        } else {
          url = url + mail;
        }
        var evt = createEvent(mailRgx, evtRootName + '.captureStart', wholeMatch, mail, null, url, null, options, globals);
        return leadingChar + writeAnchorTag(evt, options, globals);
      });


      text = globals.converter._dispatch(evtRootName + '.end', text, options, globals).getText();
      return text;
    });
  })();

  /**
   * Form HTML ordered (numbered) and unordered (bulleted) lists.
   */
  showdown.subParser('makehtml.lists', function (text, options, globals) {
    'use strict';

    /**
     * Process the contents of a single ordered or unordered list, splitting it
     * into individual list items.
     * @param {string} listStr
     * @param {boolean} trimTrailing
     * @returns {string}
     */
    function processListItems(listStr, trimTrailing) {
      // The $g_list_level global keeps track of when we're inside a list.
      // Each time we enter a list, we increment it; when we leave a list,
      // we decrement. If it's zero, we're not in a list anymore.
      //
      // We do this because when we're not inside a list, we want to treat
      // something like this:
      //
      //    I recommend upgrading to version
      //    8. Oops, now this line is treated
      //    as a sub-list.
      //
      // As a single paragraph, despite the fact that the second line starts
      // with a digit-period-space sequence.
      //
      // Whereas when we're inside a list (or sub-list), that line will be
      // treated as the start of a sub-list. What a kludge, huh? This is
      // an aspect of Markdown's syntax that's hard to parse perfectly
      // without resorting to mind-reading. Perhaps the solution is to
      // change the syntax rules such that sub-lists must start with a
      // starting cardinal number; e.g. "1." or "a.".
      globals.gListLevel++;

      // trim trailing blank lines:
      listStr = listStr.replace(/\n{2,}$/, '\n');

      // attacklab: add sentinel to emulate \z
      listStr += '¨0';

      var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[([xX ])])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm,
        isParagraphed = (/\n[ \t]*\n(?!¨0)/.test(listStr));

      // Since version 1.5, nesting sublists requires 4 spaces (or 1 tab) indentation,
      // which is a syntax breaking change
      // activating this option reverts to old behavior
      // This will be removed in version 2.0
      if (options.disableForced4SpacesIndentedSublists) {
        rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[([xX ])])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
      }

      listStr = listStr.replace(rgx, function (wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
        checked = (checked && checked.trim() !== '');

        var item = showdown.subParser('makehtml.outdent')(m4, options, globals),
          bulletStyle = '';

        // Support for github tasklists
        if (taskbtn && options.tasklists) {

          // Style used for tasklist bullets
          bulletStyle = ' class="task-list-item';
          if (options.moreStyling) { bulletStyle += checked ? ' task-list-item-complete' : ''; }
          bulletStyle += '" style="list-style-type: none;"';

          item = item.replace(/^[ \t]*\[([xX ])?]/m, function () {
            var otp = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
            if (checked) {
              otp += ' checked';
            }
            otp += '>';
            return otp;
          });
        }

        // ISSUE #312
        // This input: - - - a
        // causes trouble to the parser, since it interprets it as:
        // <ul><li><li><li>a</li></li></li></ul>
        // instead of:
        // <ul><li>- - a</li></ul>
        // So, to prevent it, we will put a marker (¨A)in the beginning of the line
        // Kind of hackish/monkey patching, but seems more effective than overcomplicating the list parser
        item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function (wm2) {
          return '¨A' + wm2;
        });

        // SPECIAL CASE: a heading followed by a paragraph of text that is not separated by a double newline
        // or/nor indented. ex:
        //
        // - # foo
        // bar is great
        //
        // While this does now follow the spec per se, not allowing for this might cause confusion since
        // header blocks don't need double-newlines after
        if (/^#+.+\n.+/.test(item)) {
          item = item.replace(/^(#+.+)$/m, '$1\n');
        }

        // m1 - Leading line or
        // Has a double return (multi paragraph)
        if (m1 || (item.search(/\n{2,}/) > -1)) {
          item = showdown.subParser('makehtml.githubCodeBlocks')(item, options, globals);
          item = showdown.subParser('makehtml.blockQuotes')(item, options, globals);
          item = showdown.subParser('makehtml.headers')(item, options, globals);
          item = showdown.subParser('makehtml.lists')(item, options, globals);
          item = showdown.subParser('makehtml.codeBlocks')(item, options, globals);
          item = showdown.subParser('makehtml.tables')(item, options, globals);
          item = showdown.subParser('makehtml.hashHTMLBlocks')(item, options, globals);
          //item = showdown.subParser('makehtml.paragraphs')(item, options, globals);

          // TODO: This is a copy of the paragraph parser
          // This is a provisory fix for issue #494
          // For a permanente fix we need to rewrite the paragraph parser, passing the unhashify logic outside
          // so that we can call the paragraph parser without accidently unashifying previously parsed blocks

          // Strip leading and trailing lines:
          item = item.replace(/^\n+/g, '');
          item = item.replace(/\n+$/g, '');

          var grafs = item.split(/\n{2,}/g),
            grafsOut = [],
            end = grafs.length; // Wrap <p> tags

          for (var i = 0; i < end; i++) {
            var str = grafs[i];
            // if this is an HTML marker, copy it
            if (str.search(/¨([KG])(\d+)\1/g) >= 0) {
              grafsOut.push(str);

              // test for presence of characters to prevent empty lines being parsed
              // as paragraphs (resulting in undesired extra empty paragraphs)
            } else if (str.search(/\S/) >= 0) {
              str = showdown.subParser('makehtml.spanGamut')(str, options, globals);
              str = str.replace(/^([ \t]*)/g, '<p>');
              str += '</p>';
              grafsOut.push(str);
            }
          }
          item = grafsOut.join('\n');
          // Strip leading and trailing lines:
          item = item.replace(/^\n+/g, '');
          item = item.replace(/\n+$/g, '');

        } else {

          // Recursion for sub-lists:
          item = showdown.subParser('makehtml.lists')(item, options, globals);
          item = item.replace(/\n$/, ''); // chomp(item)
          item = showdown.subParser('makehtml.hashHTMLBlocks')(item, options, globals);

          // Colapse double linebreaks
          item = item.replace(/\n\n+/g, '\n\n');

          if (isParagraphed) {
            item = showdown.subParser('makehtml.paragraphs')(item, options, globals);
          } else {
            item = showdown.subParser('makehtml.spanGamut')(item, options, globals);
          }
        }

        // now we need to remove the marker (¨A)
        item = item.replace('¨A', '');
        // we can finally wrap the line in list item tags
        item = '<li' + bulletStyle + '>' + item + '</li>\n';

        return item;
      });

      // attacklab: strip sentinel
      listStr = listStr.replace(/¨0/g, '');

      globals.gListLevel--;

      if (trimTrailing) {
        listStr = listStr.replace(/\s+$/, '');
      }

      return listStr;
    }

    function styleStartNumber(list, listType) {
      // check if ol and starts by a number different than 1
      if (listType === 'ol') {
        var res = list.match(/^ *(\d+)\./);
        if (res && res[1] !== '1') {
          return ' start="' + res[1] + '"';
        }
      }
      return '';
    }

    /**
     * Check and parse consecutive lists (better fix for issue #142)
     * @param {string} list
     * @param {string} listType
     * @param {boolean} trimTrailing
     * @returns {string}
     */
    function parseConsecutiveLists(list, listType, trimTrailing) {
      // check if we caught 2 or more consecutive lists by mistake
      // we use the counterRgx, meaning if listType is UL we look for OL and vice versa
      var olRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm,
        ulRgx = (options.disableForced4SpacesIndentedSublists) ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm,
        counterRxg = (listType === 'ul') ? olRgx : ulRgx,
        result = '';

      if (list.search(counterRxg) !== -1) {
        (function parseCL(txt) {
          var pos = txt.search(counterRxg),
            style = styleStartNumber(list, listType);
          if (pos !== -1) {
            // slice
            result += '\n\n<' + listType + style + '>\n' + processListItems(txt.slice(0, pos), !!trimTrailing) + '</' + listType + '>\n';

            // invert counterType and listType
            listType = (listType === 'ul') ? 'ol' : 'ul';
            counterRxg = (listType === 'ul') ? olRgx : ulRgx;

            //recurse
            parseCL(txt.slice(pos));
          } else {
            result += '\n\n<' + listType + style + '>\n' + processListItems(txt, !!trimTrailing) + '</' + listType + '>\n';
          }
        })(list);
      } else {
        var style = styleStartNumber(list, listType);
        result = '\n\n<' + listType + style + '>\n' + processListItems(list, !!trimTrailing) + '</' + listType + '>\n';
      }

      return result;
    }

    // Start of list parsing
    var subListRgx = /^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
    var mainListRgx = /(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;

    text = globals.converter._dispatch('lists.before', text, options, globals).getText();
    // add sentinel to hack around khtml/safari bug:
    // http://bugs.webkit.org/show_bug.cgi?id=11231
    text += '¨0';

    if (globals.gListLevel) {
      text = text.replace(subListRgx, function (wholeMatch, list, m2) {
        var listType = (m2.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, true);
      });
    } else {
      text = text.replace(mainListRgx, function (wholeMatch, m1, list, m3) {
        var listType = (m3.search(/[*+-]/g) > -1) ? 'ul' : 'ol';
        return parseConsecutiveLists(list, listType, false);
      });
    }

    // strip sentinel
    text = text.replace(/¨0/, '');
    text = globals.converter._dispatch('makehtml.lists.after', text, options, globals).getText();
    return text;
  });

  /**
   * Parse metadata at the top of the document
   */
  showdown.subParser('makehtml.metadata', function (text, options, globals) {
    'use strict';

    if (!options.metadata) {
      return text;
    }

    text = globals.converter._dispatch('makehtml.metadata.before', text, options, globals).getText();

    function parseMetadataContents(content) {
      // raw is raw so it's not changed in any way
      globals.metadata.raw = content;

      // escape chars forbidden in html attributes
      // double quotes
      content = content
        // ampersand first
        .replace(/&/g, '&amp;')
        // double quotes
        .replace(/"/g, '&quot;');

      // Restore dollar signs and tremas
      content = content
        .replace(/¨D/g, '$$')
        .replace(/¨T/g, '¨');

      content = content.replace(/\n {4}/g, ' ');
      content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function (wm, key, value) {
        globals.metadata.parsed[key] = value;
        return '';
      });
    }

    text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function (wholematch, format, content) {
      parseMetadataContents(content);
      return '¨M';
    });

    text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function (wholematch, format, content) {
      if (format) {
        globals.metadata.format = format;
      }
      parseMetadataContents(content);
      return '¨M';
    });

    text = text.replace(/¨M/g, '');

    text = globals.converter._dispatch('makehtml.metadata.after', text, options, globals).getText();
    return text;
  });

  /**
   * Remove one level of line-leading tabs or spaces
   */
  showdown.subParser('makehtml.outdent', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.outdent.before', text, options, globals).getText();

    // attacklab: hack around Konqueror 3.5.4 bug:
    // "----------bug".replace(/^-/g,"") == "bug"
    text = text.replace(/^(\t|[ ]{1,4})/gm, '¨0'); // attacklab: g_tab_width

    // attacklab: clean up hack
    text = text.replace(/¨0/g, '');

    text = globals.converter._dispatch('makehtml.outdent.after', text, options, globals).getText();
    return text;
  });

  /**
   *
   */
  showdown.subParser('makehtml.paragraphs', function (text, options, globals) {
    'use strict';

    text = globals.converter._dispatch('makehtml.paragraphs.before', text, options, globals).getText();
    // Strip leading and trailing lines:
    text = text.replace(/^\n+/g, '');
    text = text.replace(/\n+$/g, '');

    var grafs = text.split(/\n{2,}/g),
      grafsOut = [],
      end = grafs.length; // Wrap <p> tags

    for (var i = 0; i < end; i++) {
      var str = grafs[i];
      // if this is an HTML marker, copy it
      if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
        grafsOut.push(str);

        // test for presence of characters to prevent empty lines being parsed
        // as paragraphs (resulting in undesired extra empty paragraphs)
      } else if (str.search(/\S/) >= 0) {
        str = showdown.subParser('makehtml.spanGamut')(str, options, globals);
        str = str.replace(/^([ \t]*)/g, '<p>');
        str += '</p>';
        grafsOut.push(str);
      }
    }

    /** Unhashify HTML blocks */
    end = grafsOut.length;
    for (i = 0; i < end; i++) {
      var blockText = '',
        grafsOutIt = grafsOut[i],
        codeFlag = false;
      // if this is a marker for an html block...
      // use RegExp.test instead of string.search because of QML bug
      while (/¨(K|G)(\d+)\1/.test(grafsOutIt)) {
        var delim = RegExp.$1,
          num = RegExp.$2;

        if (delim === 'K') {
          blockText = globals.gHtmlBlocks[num];
        } else {
          // we need to check if ghBlock is a false positive
          if (codeFlag) {
            // use encoded version of all text
            blockText = showdown.subParser('makehtml.encodeCode')(globals.ghCodeBlocks[num].text, options, globals);
          } else {
            blockText = globals.ghCodeBlocks[num].codeblock;
          }
        }
        blockText = blockText.replace(/\$/g, '$$$$'); // Escape any dollar signs

        grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
        // Check if grafsOutIt is a pre->code
        if (/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(grafsOutIt)) {
          codeFlag = true;
        }
      }
      grafsOut[i] = grafsOutIt;
    }
    text = grafsOut.join('\n');
    // Strip leading and trailing lines:
    text = text.replace(/^\n+/g, '');
    text = text.replace(/\n+$/g, '');
    return globals.converter._dispatch('makehtml.paragraphs.after', text, options, globals).getText();
  });

  /**
   * Run extension
   */
  showdown.subParser('makehtml.runExtension', function (ext, text, options, globals) {
    'use strict';

    if (ext.filter) {
      text = ext.filter(text, globals.converter, options);

    } else if (ext.regex) {
      // TODO remove this when old extension loading mechanism is deprecated
      var re = ext.regex;
      if (!(re instanceof RegExp)) {
        re = new RegExp(re, 'g');
      }
      text = text.replace(re, ext.replace);
    }

    return text;
  });

  /**
   * These are all the transformations that occur *within* block-level
   * tags like paragraphs, headers, and list items.
   */
  showdown.subParser('makehtml.spanGamut', function (text, options, globals) {
    'use strict';

    text = globals.converter._dispatch('makehtml.span.before', text, options, globals).getText();

    text = showdown.subParser('makehtml.codeSpans')(text, options, globals);
    text = showdown.subParser('makehtml.escapeSpecialCharsWithinTagAttributes')(text, options, globals);
    text = showdown.subParser('makehtml.encodeBackslashEscapes')(text, options, globals);

    // Process link and image tags. Images must come first,
    // because ![foo][f] looks like a link.
    text = showdown.subParser('makehtml.images')(text, options, globals);

    text = globals.converter._dispatch('smakehtml.links.before', text, options, globals).getText();
    text = showdown.subParser('makehtml.links')(text, options, globals);
    text = globals.converter._dispatch('smakehtml.links.after', text, options, globals).getText();

    //text = showdown.subParser('makehtml.autoLinks')(text, options, globals);
    //text = showdown.subParser('makehtml.simplifiedAutoLinks')(text, options, globals);
    text = showdown.subParser('makehtml.emoji')(text, options, globals);
    text = showdown.subParser('makehtml.underline')(text, options, globals);
    text = showdown.subParser('makehtml.italicsAndBold')(text, options, globals);
    text = showdown.subParser('makehtml.strikethrough')(text, options, globals);
    text = showdown.subParser('makehtml.ellipsis')(text, options, globals);

    // we need to hash HTML tags inside spans
    text = showdown.subParser('makehtml.hashHTMLSpans')(text, options, globals);

    // now we encode amps and angles
    text = showdown.subParser('makehtml.encodeAmpsAndAngles')(text, options, globals);

    // Do hard breaks
    if (options.simpleLineBreaks) {
      // GFM style hard breaks
      // only add line breaks if the text does not contain a block (special case for lists)
      if (!/\n\n¨K/.test(text)) {
        text = text.replace(/\n+/g, '<br />\n');
      }
    } else {
      // Vanilla hard breaks
      text = text.replace(/  +\n/g, '<br />\n');
    }

    text = globals.converter._dispatch('makehtml.spanGamut.after', text, options, globals).getText();
    return text;
  });

  showdown.subParser('makehtml.strikethrough', function (text, options, globals) {
    'use strict';

    if (options.strikethrough) {
      text = globals.converter._dispatch('makehtml.strikethrough.before', text, options, globals).getText();
      text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function (wm, txt) { return '<del>' + txt + '</del>'; });
      text = globals.converter._dispatch('makehtml.strikethrough.after', text, options, globals).getText();
    }

    return text;
  });

  /**
   * Strips link definitions from text, stores the URLs and titles in
   * hash references.
   * Link defs are in the form: ^[id]: url "optional title"
   */
  showdown.subParser('makehtml.stripLinkDefinitions', function (text, options, globals) {
    'use strict';

    var regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm,
      base64Regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;

    // attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
    text += '¨0';

    var replaceFunc = function (wholeMatch, linkId, url, width, height, blankLines, title) {

      // if there aren't two instances of linkId it must not be a reference link so back out
      linkId = linkId.toLowerCase();
      if (text.toLowerCase().split(linkId).length - 1 < 2) {
        return wholeMatch;
      }
      if (url.match(/^data:.+?\/.+?;base64,/)) {
        // remove newlines
        globals.gUrls[linkId] = url.replace(/\s/g, '');
      } else {
        url = showdown.helper.applyBaseUrl(options.relativePathBaseUrl, url);

        globals.gUrls[linkId] = showdown.subParser('makehtml.encodeAmpsAndAngles')(url, options, globals);  // Link IDs are case-insensitive
      }

      if (blankLines) {
        // Oops, found blank lines, so it's not a title.
        // Put back the parenthetical statement we stole.
        return blankLines + title;

      } else {
        if (title) {
          globals.gTitles[linkId] = title.replace(/"|'/g, '&quot;');
        }
        if (options.parseImgDimensions && width && height) {
          globals.gDimensions[linkId] = {
            width: width,
            height: height
          };
        }
      }
      // Completely remove the definition from the text
      return '';
    };

    // first we try to find base64 link references
    text = text.replace(base64Regex, replaceFunc);

    text = text.replace(regex, replaceFunc);

    // attacklab: strip sentinel
    text = text.replace(/¨0/, '');

    return text;
  });

  showdown.subParser('makehtml.tables', function (text, options, globals) {
    'use strict';

    if (!options.tables) {
      return text;
    }

    var tableRgx = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*[-=]{2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*[-=]{2,}[\s\S]+?(?:\n\n|¨0)/gm,
      //singeColTblRgx = /^ {0,3}\|.+\|\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n(?: {0,3}\|.+\|\n)+(?:\n\n|¨0)/gm;
      singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*[-=]{2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;

    function parseStyles(sLine) {
      if (/^:[ \t]*--*$/.test(sLine)) {
        return ' style="text-align:left;"';
      } else if (/^--*[ \t]*:[ \t]*$/.test(sLine)) {
        return ' style="text-align:right;"';
      } else if (/^:[ \t]*--*[ \t]*:$/.test(sLine)) {
        return ' style="text-align:center;"';
      } else {
        return '';
      }
    }

    function parseHeaders(header, style) {
      var id = '';
      header = header.trim();
      // support both tablesHeaderId and tableHeaderId due to error in documentation so we don't break backwards compatibility
      if (options.tablesHeaderId || options.tableHeaderId) {
        id = ' id="' + header.replace(/ /g, '_').toLowerCase() + '"';
      }
      header = showdown.subParser('makehtml.spanGamut')(header, options, globals);

      return '<th' + id + style + '>' + header + '</th>\n';
    }

    function parseCells(cell, style) {
      var subText = showdown.subParser('makehtml.spanGamut')(cell, options, globals);
      return '<td' + style + '>' + subText + '</td>\n';
    }

    function buildTable(headers, cells) {
      var tb = '<table>\n<thead>\n<tr>\n',
        tblLgn = headers.length;

      for (var i = 0; i < tblLgn; ++i) {
        tb += headers[i];
      }
      tb += '</tr>\n</thead>\n<tbody>\n';

      for (i = 0; i < cells.length; ++i) {
        tb += '<tr>\n';
        for (var ii = 0; ii < tblLgn; ++ii) {
          tb += cells[i][ii];
        }
        tb += '</tr>\n';
      }
      tb += '</tbody>\n</table>\n';
      return tb;
    }

    function parseTable(rawTable) {
      var i, tableLines = rawTable.split('\n');

      for (i = 0; i < tableLines.length; ++i) {
        // strip wrong first and last column if wrapped tables are used
        if (/^ {0,3}\|/.test(tableLines[i])) {
          tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, '');
        }
        if (/\|[ \t]*$/.test(tableLines[i])) {
          tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, '');
        }
        // parse code spans first, but we only support one line code spans

        tableLines[i] = showdown.subParser('makehtml.codeSpans')(tableLines[i], options, globals);
      }

      var rawHeaders = tableLines[0].split('|').map(function (s) { return s.trim(); }),
        rawStyles = tableLines[1].split('|').map(function (s) { return s.trim(); }),
        rawCells = [],
        headers = [],
        styles = [],
        cells = [];

      tableLines.shift();
      tableLines.shift();

      for (i = 0; i < tableLines.length; ++i) {
        if (tableLines[i].trim() === '') {
          continue;
        }
        rawCells.push(
          tableLines[i]
            .split('|')
            .map(function (s) {
              return s.trim();
            })
        );
      }

      if (rawHeaders.length < rawStyles.length) {
        return rawTable;
      }

      for (i = 0; i < rawStyles.length; ++i) {
        styles.push(parseStyles(rawStyles[i]));
      }

      for (i = 0; i < rawHeaders.length; ++i) {
        if (showdown.helper.isUndefined(styles[i])) {
          styles[i] = '';
        }
        headers.push(parseHeaders(rawHeaders[i], styles[i]));
      }

      for (i = 0; i < rawCells.length; ++i) {
        var row = [];
        for (var ii = 0; ii < headers.length; ++ii) {
          if (showdown.helper.isUndefined(rawCells[i][ii])) {

          }
          row.push(parseCells(rawCells[i][ii], styles[ii]));
        }
        cells.push(row);
      }

      return buildTable(headers, cells);
    }

    text = globals.converter._dispatch('makehtml.tables.before', text, options, globals).getText();

    // find escaped pipe characters
    text = text.replace(/\\(\|)/g, showdown.helper.escapeCharactersCallback);

    // parse multi column tables
    text = text.replace(tableRgx, parseTable);

    // parse one column tables
    text = text.replace(singeColTblRgx, parseTable);

    text = globals.converter._dispatch('makehtml.tables.after', text, options, globals).getText();

    return text;
  });

  showdown.subParser('makehtml.underline', function (text, options, globals) {
    'use strict';

    if (!options.underline) {
      return text;
    }

    text = globals.converter._dispatch('makehtml.underline.before', text, options, globals).getText();

    if (options.literalMidWordUnderscores) {
      text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function (wm, txt) {
        return '<u>' + txt + '</u>';
      });
      text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function (wm, txt) {
        return '<u>' + txt + '</u>';
      });
    } else {
      text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
        return (/\S$/.test(m)) ? '<u>' + m + '</u>' : wm;
      });
      text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
        return (/\S$/.test(m)) ? '<u>' + m + '</u>' : wm;
      });
    }

    // escape remaining underscores to prevent them being parsed by italic and bold
    text = text.replace(/(_)/g, showdown.helper.escapeCharactersCallback);

    text = globals.converter._dispatch('makehtml.underline.after', text, options, globals).getText();

    return text;
  });

  /**
   * Swap back in all the special characters we've hidden.
   */
  showdown.subParser('makehtml.unescapeSpecialChars', function (text, options, globals) {
    'use strict';
    text = globals.converter._dispatch('makehtml.unescapeSpecialChars.before', text, options, globals).getText();

    text = text.replace(/¨E(\d+)E/g, function (wholeMatch, m1) {
      var charCodeToReplace = parseInt(m1);
      return String.fromCharCode(charCodeToReplace);
    });

    text = globals.converter._dispatch('makehtml.unescapeSpecialChars.after', text, options, globals).getText();
    return text;
  });

  showdown.subParser('makeMarkdown.blockquote', function (node, globals) {
    'use strict';

    var txt = '';
    if (node.hasChildNodes()) {
      var children = node.childNodes,
        childrenLength = children.length;

      for (var i = 0; i < childrenLength; ++i) {
        var innerTxt = showdown.subParser('makeMarkdown.node')(children[i], globals);

        if (innerTxt === '') {
          continue;
        }
        txt += innerTxt;
      }
    }
    // cleanup
    txt = txt.trim();
    txt = '> ' + txt.split('\n').join('\n> ');
    return txt;
  });

  showdown.subParser('makeMarkdown.break', function () {
    'use strict';

    return '  \n';
  });

  showdown.subParser('makeMarkdown.codeBlock', function (node, globals) {
    'use strict';

    var lang = node.getAttribute('language'),
      num = node.getAttribute('precodenum');
    return '```' + lang + '\n' + globals.preList[num] + '\n```';
  });

  showdown.subParser('makeMarkdown.codeSpan', function (node) {
    'use strict';

    return '`' + node.innerHTML + '`';
  });

  showdown.subParser('makeMarkdown.emphasis', function (node, globals) {
    'use strict';

    var txt = '';
    if (node.hasChildNodes()) {
      txt += '*';
      var children = node.childNodes,
        childrenLength = children.length;
      for (var i = 0; i < childrenLength; ++i) {
        txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
      }
      txt += '*';
    }
    return txt;
  });

  showdown.subParser('makeMarkdown.header', function (node, globals, headerLevel) {
    'use strict';

    var headerMark = new Array(headerLevel + 1).join('#'),
      txt = '';

    if (node.hasChildNodes()) {
      txt = headerMark + ' ';
      var children = node.childNodes,
        childrenLength = children.length;

      for (var i = 0; i < childrenLength; ++i) {
        txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
      }
    }
    return txt;
  });

  showdown.subParser('makeMarkdown.hr', function () {
    'use strict';

    return '---';
  });

  showdown.subParser('makeMarkdown.image', function (node) {
    'use strict';

    var txt = '';
    if (node.hasAttribute('src')) {
      txt += '![' + node.getAttribute('alt') + '](';
      txt += '<' + node.getAttribute('src') + '>';
      if (node.hasAttribute('width') && node.hasAttribute('height')) {
        txt += ' =' + node.getAttribute('width') + 'x' + node.getAttribute('height');
      }

      if (node.hasAttribute('title')) {
        txt += ' "' + node.getAttribute('title') + '"';
      }
      txt += ')';
    }
    return txt;
  });

  showdown.subParser('makeMarkdown.input', function (node, globals) {
    'use strict';

    var txt = '';
    if (node.getAttribute('checked') !== null) {
      txt += '[x]';
    } else {
      txt += '[ ]';
    }
    var children = node.childNodes,
      childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    return txt;
  });

  showdown.subParser('makeMarkdown.links', function (node, globals) {
    'use strict';

    var txt = '';
    if (node.hasChildNodes() && node.hasAttribute('href')) {
      var children = node.childNodes,
        childrenLength = children.length;
      txt = '[';
      for (var i = 0; i < childrenLength; ++i) {
        txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
      }
      txt += '](';
      txt += '<' + node.getAttribute('href') + '>';
      if (node.hasAttribute('title')) {
        txt += ' "' + node.getAttribute('title') + '"';
      }
      txt += ')';
    }
    return txt;
  });

  showdown.subParser('makeMarkdown.list', function (node, globals, type) {
    'use strict';

    var txt = '';
    if (!node.hasChildNodes()) {
      return '';
    }
    var listItems = node.childNodes,
      listItemsLenght = listItems.length,
      listNum = node.getAttribute('start') || 1;

    for (var i = 0; i < listItemsLenght; ++i) {
      if (typeof listItems[i].tagName === 'undefined' || listItems[i].tagName.toLowerCase() !== 'li') {
        continue;
      }

      // define the bullet to use in list
      var bullet = '';
      if (type === 'ol') {
        bullet = listNum.toString() + '. ';
      } else {
        bullet = '- ';
      }

      // parse list item
      txt += bullet + showdown.subParser('makeMarkdown.listItem')(listItems[i], globals);
      ++listNum;
    }

    return txt.trim();
  });

  showdown.subParser('makeMarkdown.listItem', function (node, globals) {
    'use strict';

    var listItemTxt = '';

    var children = node.childNodes,
      childrenLenght = children.length;

    for (var i = 0; i < childrenLenght; ++i) {
      listItemTxt += showdown.subParser('makeMarkdown.node')(children[i], globals);
    }
    // if it's only one liner, we need to add a newline at the end
    if (!/\n$/.test(listItemTxt)) {
      listItemTxt += '\n';
    } else {
      // it's multiparagraph, so we need to indent
      listItemTxt = listItemTxt
        .split('\n')
        .join('\n    ')
        .replace(/^ {4}$/gm, '')
        .replace(/\n\n+/g, '\n\n');
    }

    return listItemTxt;
  });



  showdown.subParser('makeMarkdown.node', function (node, globals, spansOnly) {
    'use strict';

    spansOnly = spansOnly || false;

    var txt = '';

    // edge case of text without wrapper paragraph
    if (node.nodeType === 3) {
      return showdown.subParser('makeMarkdown.txt')(node, globals);
    }

    // HTML comment
    if (node.nodeType === 8) {
      return '<!--' + node.data + '-->\n\n';
    }

    // process only node elements
    if (node.nodeType !== 1) {
      return '';
    }

    var tagName = node.tagName.toLowerCase();

    switch (tagName) {

      //
      // BLOCKS
      //
      case 'h1':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 1) + '\n\n'; }
        break;
      case 'h2':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 2) + '\n\n'; }
        break;
      case 'h3':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 3) + '\n\n'; }
        break;
      case 'h4':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 4) + '\n\n'; }
        break;
      case 'h5':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 5) + '\n\n'; }
        break;
      case 'h6':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.header')(node, globals, 6) + '\n\n'; }
        break;

      case 'p':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.paragraph')(node, globals) + '\n\n'; }
        break;

      case 'blockquote':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.blockquote')(node, globals) + '\n\n'; }
        break;

      case 'hr':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.hr')(node, globals) + '\n\n'; }
        break;

      case 'ol':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.list')(node, globals, 'ol') + '\n\n'; }
        break;

      case 'ul':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.list')(node, globals, 'ul') + '\n\n'; }
        break;

      case 'precode':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.codeBlock')(node, globals) + '\n\n'; }
        break;

      case 'pre':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.pre')(node, globals) + '\n\n'; }
        break;

      case 'table':
        if (!spansOnly) { txt = showdown.subParser('makeMarkdown.table')(node, globals) + '\n\n'; }
        break;

      //
      // SPANS
      //
      case 'code':
        txt = showdown.subParser('makeMarkdown.codeSpan')(node, globals);
        break;

      case 'em':
      case 'i':
        txt = showdown.subParser('makeMarkdown.emphasis')(node, globals);
        break;

      case 'strong':
      case 'b':
        txt = showdown.subParser('makeMarkdown.strong')(node, globals);
        break;

      case 'del':
        txt = showdown.subParser('makeMarkdown.strikethrough')(node, globals);
        break;

      case 'a':
        txt = showdown.subParser('makeMarkdown.links')(node, globals);
        break;

      case 'img':
        txt = showdown.subParser('makeMarkdown.image')(node, globals);
        break;

      case 'br':
        txt = showdown.subParser('makeMarkdown.break')(node, globals);
        break;

      case 'input':
        txt = showdown.subParser('makeMarkdown.input')(node, globals);
        break;

      default:
        txt = node.outerHTML + '\n\n';
    }

    // common normalization
    // TODO eventually

    return txt;
  });

  showdown.subParser('makeMarkdown.paragraph', function (node, globals) {
    'use strict';

    var txt = '';
    if (node.hasChildNodes()) {
      var children = node.childNodes,
        childrenLength = children.length;
      for (var i = 0; i < childrenLength; ++i) {
        txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
      }
    }

    // some text normalization
    txt = txt.trim();

    return txt;
  });

  showdown.subParser('makeMarkdown.pre', function (node, globals) {
    'use strict';

    var num = node.getAttribute('prenum');
    return '<pre>' + globals.preList[num] + '</pre>';
  });

  showdown.subParser('makeMarkdown.strikethrough', function (node, globals) {
    'use strict';

    var txt = '';
    if (node.hasChildNodes()) {
      txt += '~~';
      var children = node.childNodes,
        childrenLength = children.length;
      for (var i = 0; i < childrenLength; ++i) {
        txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
      }
      txt += '~~';
    }
    return txt;
  });

  showdown.subParser('makeMarkdown.strong', function (node, globals) {
    'use strict';

    var txt = '';
    if (node.hasChildNodes()) {
      txt += '**';
      var children = node.childNodes,
        childrenLength = children.length;
      for (var i = 0; i < childrenLength; ++i) {
        txt += showdown.subParser('makeMarkdown.node')(children[i], globals);
      }
      txt += '**';
    }
    return txt;
  });

  showdown.subParser('makeMarkdown.table', function (node, globals) {
    'use strict';

    var txt = '',
      tableArray = [[], []],
      headings = node.querySelectorAll('thead>tr>th'),
      rows = node.querySelectorAll('tbody>tr'),
      i, ii;
    for (i = 0; i < headings.length; ++i) {
      var headContent = showdown.subParser('makeMarkdown.tableCell')(headings[i], globals),
        allign = '---';

      if (headings[i].hasAttribute('style')) {
        var style = headings[i].getAttribute('style').toLowerCase().replace(/\s/g, '');
        switch (style) {
          case 'text-align:left;':
            allign = ':---';
            break;
          case 'text-align:right;':
            allign = '---:';
            break;
          case 'text-align:center;':
            allign = ':---:';
            break;
        }
      }
      tableArray[0][i] = headContent.trim();
      tableArray[1][i] = allign;
    }

    for (i = 0; i < rows.length; ++i) {
      var r = tableArray.push([]) - 1,
        cols = rows[i].getElementsByTagName('td');

      for (ii = 0; ii < headings.length; ++ii) {
        var cellContent = ' ';
        if (typeof cols[ii] !== 'undefined') {
          cellContent = showdown.subParser('makeMarkdown.tableCell')(cols[ii], globals);
        }
        tableArray[r].push(cellContent);
      }
    }

    var cellSpacesCount = 3;
    for (i = 0; i < tableArray.length; ++i) {
      for (ii = 0; ii < tableArray[i].length; ++ii) {
        var strLen = tableArray[i][ii].length;
        if (strLen > cellSpacesCount) {
          cellSpacesCount = strLen;
        }
      }
    }

    for (i = 0; i < tableArray.length; ++i) {
      for (ii = 0; ii < tableArray[i].length; ++ii) {
        if (i === 1) {
          if (tableArray[i][ii].slice(-1) === ':') {
            tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii].slice(0, -1), cellSpacesCount - 1, '-') + ':';
          } else {
            tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount, '-');
          }
        } else {
          tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount);
        }
      }
      txt += '| ' + tableArray[i].join(' | ') + ' |\n';
    }

    return txt.trim();
  });

  showdown.subParser('makeMarkdown.tableCell', function (node, globals) {
    'use strict';

    var txt = '';
    if (!node.hasChildNodes()) {
      return '';
    }
    var children = node.childNodes,
      childrenLength = children.length;

    for (var i = 0; i < childrenLength; ++i) {
      txt += showdown.subParser('makeMarkdown.node')(children[i], globals, true);
    }
    return txt.trim();
  });

  showdown.subParser('makeMarkdown.txt', function (node) {
    'use strict';

    var txt = node.nodeValue;

    // multiple spaces are collapsed
    txt = txt.replace(/ +/g, ' ');

    // replace the custom ¨NBSP; with a space
    txt = txt.replace(/¨NBSP;/g, ' ');

    // ", <, > and & should replace escaped html entities
    txt = showdown.helper.unescapeHTMLEntities(txt);

    // escape markdown magic characters
    // emphasis, strong and strikethrough - can appear everywhere
    // we also escape pipe (|) because of tables
    // and escape ` because of code blocks and spans
    txt = txt.replace(/([*_~|`])/g, '\\$1');

    // escape > because of blockquotes
    txt = txt.replace(/^(\s*)>/g, '\\$1>');

    // hash character, only troublesome at the beginning of a line because of headers
    txt = txt.replace(/^#/gm, '\\#');

    // horizontal rules
    txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, '$1\\$2$3');

    // dot, because of ordered lists, only troublesome at the beginning of a line when preceded by an integer
    txt = txt.replace(/^( {0,3}\d+)\./gm, '$1\\.');

    // +, * and -, at the beginning of a line becomes a list, so we need to escape them also (asterisk was already escaped)
    txt = txt.replace(/^( {0,3})([+-])/gm, '$1\\$2');

    // images and links, ] followed by ( is problematic, so we escape it
    txt = txt.replace(/]([\s]*)\(/g, '\\]$1\\(');

    // reference URIs must also be escaped
    txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, '\\[$1]:');

    return txt;
  });

  /**
   * Created by Estevao on 31-05-2015.
   */

  /**
   * Showdown Converter class
   * @class
   * @param {object} [converterOptions]
   * @returns {Converter}
   */
  showdown.Converter = function (converterOptions) {
    'use strict';

    var
      /**
       * Options used by this converter
       * @private
       * @type {{}}
       */
      options = {},

      /**
       * Language extensions used by this converter
       * @private
       * @type {Array}
       */
      langExtensions = [],

      /**
       * Output modifiers extensions used by this converter
       * @private
       * @type {Array}
       */
      outputModifiers = [],

      /**
       * Event listeners
       * @private
       * @type {{}}
       */
      listeners = {},

      /**
       * The flavor set in this converter
       */
      setConvFlavor = setFlavor,

      /**
       * Metadata of the document
       * @type {{parsed: {}, raw: string, format: string}}
       */
      metadata = {
        parsed: {},
        raw: '',
        format: ''
      };

    _constructor();

    /**
     * Converter constructor
     * @private
     */
    function _constructor() {
      converterOptions = converterOptions || {};

      for (var gOpt in globalOptions) {
        if (globalOptions.hasOwnProperty(gOpt)) {
          options[gOpt] = globalOptions[gOpt];
        }
      }

      // Merge options
      if (typeof converterOptions === 'object') {
        for (var opt in converterOptions) {
          if (converterOptions.hasOwnProperty(opt)) {
            options[opt] = converterOptions[opt];
          }
        }
      } else {
        throw Error('Converter expects the passed parameter to be an object, but ' + typeof converterOptions +
          ' was passed instead.');
      }

      if (options.extensions) {
        showdown.helper.forEach(options.extensions, _parseExtension);
      }
    }

    /**
     * Parse extension
     * @param {*} ext
     * @param {string} [name='']
     * @private
     */
    function _parseExtension(ext, name) {

      name = name || null;
      // If it's a string, the extension was previously loaded
      if (showdown.helper.isString(ext)) {
        ext = showdown.helper.stdExtName(ext);
        name = ext;

        // LEGACY_SUPPORT CODE
        if (showdown.extensions[ext]) {
          console.warn('DEPRECATION WARNING: ' + ext + ' is an old extension that uses a deprecated loading method.' +
            'Please inform the developer that the extension should be updated!');
          legacyExtensionLoading(showdown.extensions[ext], ext);
          return;
          // END LEGACY SUPPORT CODE

        } else if (!showdown.helper.isUndefined(extensions[ext])) {
          ext = extensions[ext];

        } else {
          throw Error('Extension "' + ext + '" could not be loaded. It was either not found or is not a valid extension.');
        }
      }

      if (typeof ext === 'function') {
        ext = ext();
      }

      if (!showdown.helper.isArray(ext)) {
        ext = [ext];
      }

      var validExt = validate(ext, name);
      if (!validExt.valid) {
        throw Error(validExt.error);
      }

      for (var i = 0; i < ext.length; ++i) {
        switch (ext[i].type) {

          case 'lang':
            langExtensions.push(ext[i]);
            break;

          case 'output':
            outputModifiers.push(ext[i]);
            break;
        }
        if (ext[i].hasOwnProperty('listeners')) {
          for (var ln in ext[i].listeners) {
            if (ext[i].listeners.hasOwnProperty(ln)) {
              listen(ln, ext[i].listeners[ln]);
            }
          }
        }
      }

    }

    /**
     * LEGACY_SUPPORT
     * @param {*} ext
     * @param {string} name
     */
    function legacyExtensionLoading(ext, name) {
      if (typeof ext === 'function') {
        ext = ext(new showdown.Converter());
      }
      if (!showdown.helper.isArray(ext)) {
        ext = [ext];
      }
      var valid = validate(ext, name);

      if (!valid.valid) {
        throw Error(valid.error);
      }

      for (var i = 0; i < ext.length; ++i) {
        switch (ext[i].type) {
          case 'lang':
            langExtensions.push(ext[i]);
            break;
          case 'output':
            outputModifiers.push(ext[i]);
            break;
          default:// should never reach here
            throw Error('Extension loader error: Type unrecognized!!!');
        }
      }
    }

    /**
     * Listen to an event
     * @param {string} name
     * @param {function} callback
     */
    function listen(name, callback) {
      if (!showdown.helper.isString(name)) {
        throw Error('Invalid argument in converter.listen() method: name must be a string, but ' + typeof name + ' given');
      }

      if (typeof callback !== 'function') {
        throw Error('Invalid argument in converter.listen() method: callback must be a function, but ' + typeof callback + ' given');
      }
      name = name.toLowerCase();
      if (!listeners.hasOwnProperty(name)) {
        listeners[name] = [];
      }
      listeners[name].push(callback);
    }

    function rTrimInputText(text) {
      var rsp = text.match(/^\s*/)[0].length,
        rgx = new RegExp('^\\s{0,' + rsp + '}', 'gm');
      return text.replace(rgx, '');
    }

    /**
     *
     * @param {string} evtName Event name
     * @param {string} text Text
     * @param {{}} options Converter Options
     * @param {{}} globals Converter globals
     * @param {{}} [pParams] extra params for event
     * @returns showdown.helper.Event
     * @private
     */
    this._dispatch = function dispatch(evtName, text, options, globals, pParams) {
      evtName = evtName.toLowerCase();
      var params = pParams || {};
      params.converter = this;
      params.text = text;
      params.options = options;
      params.globals = globals;
      var event = new showdown.helper.Event(evtName, text, params);

      if (listeners.hasOwnProperty(evtName)) {
        for (var ei = 0; ei < listeners[evtName].length; ++ei) {
          var nText = listeners[evtName][ei](event);
          if (nText && typeof nText !== 'undefined') {
            event.setText(nText);
          }
        }
      }
      return event;
    };

    /**
     * Listen to an event
     * @param {string} name
     * @param {function} callback
     * @returns {showdown.Converter}
     */
    this.listen = function (name, callback) {
      listen(name, callback);
      return this;
    };

    /**
     * Converts a markdown string into HTML string
     * @param {string} text
     * @returns {*}
     */
    this.makeHtml = function (text) {
      //check if text is not falsy
      if (!text) {
        return text;
      }

      var globals = {
        gHtmlBlocks: [],
        gHtmlMdBlocks: [],
        gHtmlSpans: [],
        gUrls: {},
        gTitles: {},
        gDimensions: {},
        gListLevel: 0,
        hashLinkCounts: {},
        langExtensions: langExtensions,
        outputModifiers: outputModifiers,
        converter: this,
        ghCodeBlocks: [],
        metadata: {
          parsed: {},
          raw: '',
          format: ''
        }
      };

      // This lets us use ¨ trema as an escape char to avoid md5 hashes
      // The choice of character is arbitrary; anything that isn't
      // magic in Markdown will work.
      text = text.replace(/¨/g, '¨T');

      // Replace $ with ¨D
      // RegExp interprets $ as a special character
      // when it's in a replacement string
      text = text.replace(/\$/g, '¨D');

      // Standardize line endings
      text = text.replace(/\r\n/g, '\n'); // DOS to Unix
      text = text.replace(/\r/g, '\n'); // Mac to Unix

      // Stardardize line spaces
      text = text.replace(/\u00A0/g, '&nbsp;');

      if (options.smartIndentationFix) {
        text = rTrimInputText(text);
      }

      // Make sure text begins and ends with a couple of newlines:
      text = '\n\n' + text + '\n\n';

      // detab
      text = showdown.subParser('makehtml.detab')(text, options, globals);

      /**
       * Strip any lines consisting only of spaces and tabs.
       * This makes subsequent regexs easier to write, because we can
       * match consecutive blank lines with /\n+/ instead of something
       * contorted like /[ \t]*\n+/
       */
      text = text.replace(/^[ \t]+$/mg, '');

      //run languageExtensions
      showdown.helper.forEach(langExtensions, function (ext) {
        text = showdown.subParser('makehtml.runExtension')(ext, text, options, globals);
      });

      // run the sub parsers
      text = showdown.subParser('makehtml.metadata')(text, options, globals);
      text = showdown.subParser('makehtml.hashPreCodeTags')(text, options, globals);
      text = showdown.subParser('makehtml.githubCodeBlocks')(text, options, globals);
      text = showdown.subParser('makehtml.hashHTMLBlocks')(text, options, globals);
      text = showdown.subParser('makehtml.hashCodeTags')(text, options, globals);
      text = showdown.subParser('makehtml.stripLinkDefinitions')(text, options, globals);
      text = showdown.subParser('makehtml.blockGamut')(text, options, globals);
      text = showdown.subParser('makehtml.unhashHTMLSpans')(text, options, globals);
      text = showdown.subParser('makehtml.unescapeSpecialChars')(text, options, globals);

      // attacklab: Restore dollar signs
      text = text.replace(/¨D/g, '$$');

      // attacklab: Restore tremas
      text = text.replace(/¨T/g, '¨');

      // render a complete html document instead of a partial if the option is enabled
      text = showdown.subParser('makehtml.completeHTMLDocument')(text, options, globals);

      // Run output modifiers
      showdown.helper.forEach(outputModifiers, function (ext) {
        text = showdown.subParser('makehtml.runExtension')(ext, text, options, globals);
      });

      // update metadata
      metadata = globals.metadata;
      return text;
    };

    /**
     * Converts an HTML string into a markdown string
     * @param src
     * @returns {string}
     */
    this.makeMarkdown = function (src) {

      // replace \r\n with \n
      src = src.replace(/\r\n/g, '\n');
      src = src.replace(/\r/g, '\n'); // old macs

      // due to an edge case, we need to find this: > <
      // to prevent removing of non silent white spaces
      // ex: <em>this is</em> <strong>sparta</strong>
      src = src.replace(/>[ \t]+</, '>¨NBSP;<');

      var doc = showdown.helper.document.createElement('div');
      doc.innerHTML = src;

      var globals = {
        preList: substitutePreCodeTags(doc)
      };

      // remove all newlines and collapse spaces
      clean(doc);

      // some stuff, like accidental reference links must now be escaped
      // TODO
      // doc.innerHTML = doc.innerHTML.replace(/\[[\S\t ]]/);

      var nodes = doc.childNodes,
        mdDoc = '';

      for (var i = 0; i < nodes.length; i++) {
        mdDoc += showdown.subParser('makeMarkdown.node')(nodes[i], globals);
      }

      function clean(node) {
        for (var n = 0; n < node.childNodes.length; ++n) {
          var child = node.childNodes[n];
          if (child.nodeType === 3) {
            if (!/\S/.test(child.nodeValue) && !/^[ ]+$/.test(child.nodeValue)) {
              node.removeChild(child);
              --n;
            } else {
              child.nodeValue = child.nodeValue.split('\n').join(' ');
              child.nodeValue = child.nodeValue.replace(/(\s)+/g, '$1');
            }
          } else if (child.nodeType === 1) {
            clean(child);
          }
        }
      }

      // find all pre tags and replace contents with placeholder
      // we need this so that we can remove all indentation from html
      // to ease up parsing
      function substitutePreCodeTags(doc) {

        var pres = doc.querySelectorAll('pre'),
          presPH = [];

        for (var i = 0; i < pres.length; ++i) {

          if (pres[i].childElementCount === 1 && pres[i].firstChild.tagName.toLowerCase() === 'code') {
            var content = pres[i].firstChild.innerHTML.trim(),
              language = pres[i].firstChild.getAttribute('data-language') || '';

            // if data-language attribute is not defined, then we look for class language-*
            if (language === '') {
              var classes = pres[i].firstChild.className.split(' ');
              for (var c = 0; c < classes.length; ++c) {
                var matches = classes[c].match(/^language-(.+)$/);
                if (matches !== null) {
                  language = matches[1];
                  break;
                }
              }
            }

            // unescape html entities in content
            content = showdown.helper.unescapeHTMLEntities(content);

            presPH.push(content);
            pres[i].outerHTML = '<precode language="' + language + '" precodenum="' + i.toString() + '"></precode>';
          } else {
            presPH.push(pres[i].innerHTML);
            pres[i].innerHTML = '';
            pres[i].setAttribute('prenum', i.toString());
          }
        }
        return presPH;
      }

      return mdDoc;
    };

    /**
     * Set an option of this Converter instance
     * @param {string} key
     * @param {*} value
     */
    this.setOption = function (key, value) {
      options[key] = value;
    };

    /**
     * Get the option of this Converter instance
     * @param {string} key
     * @returns {*}
     */
    this.getOption = function (key) {
      return options[key];
    };

    /**
     * Get the options of this Converter instance
     * @returns {{}}
     */
    this.getOptions = function () {
      return options;
    };

    /**
     * Add extension to THIS converter
     * @param {{}} extension
     * @param {string} [name=null]
     */
    this.addExtension = function (extension, name) {
      name = name || null;
      _parseExtension(extension, name);
    };

    /**
     * Use a global registered extension with THIS converter
     * @param {string} extensionName Name of the previously registered extension
     */
    this.useExtension = function (extensionName) {
      _parseExtension(extensionName);
    };

    /**
     * Set the flavor THIS converter should use
     * @param {string} name
     */
    this.setFlavor = function (name) {
      if (!flavor.hasOwnProperty(name)) {
        throw Error(name + ' flavor was not found');
      }
      var preset = flavor[name];
      setConvFlavor = name;
      for (var option in preset) {
        if (preset.hasOwnProperty(option)) {
          options[option] = preset[option];
        }
      }
    };

    /**
     * Get the currently set flavor of this converter
     * @returns {string}
     */
    this.getFlavor = function () {
      return setConvFlavor;
    };

    /**
     * Remove an extension from THIS converter.
     * Note: This is a costly operation. It's better to initialize a new converter
     * and specify the extensions you wish to use
     * @param {Array} extension
     */
    this.removeExtension = function (extension) {
      if (!showdown.helper.isArray(extension)) {
        extension = [extension];
      }
      for (var a = 0; a < extension.length; ++a) {
        var ext = extension[a];
        for (var i = 0; i < langExtensions.length; ++i) {
          if (langExtensions[i] === ext) {
            langExtensions.splice(i, 1);
          }
        }
        for (var ii = 0; ii < outputModifiers.length; ++ii) {
          if (outputModifiers[ii] === ext) {
            outputModifiers.splice(ii, 1);
          }
        }
      }
    };

    /**
     * Get all extension of THIS converter
     * @returns {{language: Array, output: Array}}
     */
    this.getAllExtensions = function () {
      return {
        language: langExtensions,
        output: outputModifiers
      };
    };

    /**
     * Get the metadata of the previously parsed document
     * @param raw
     * @returns {string|{}}
     */
    this.getMetadata = function (raw) {
      if (raw) {
        return metadata.raw;
      } else {
        return metadata.parsed;
      }
    };

    /**
     * Get the metadata format of the previously parsed document
     * @returns {string}
     */
    this.getMetadataFormat = function () {
      return metadata.format;
    };

    /**
     * Private: set a single key, value metadata pair
     * @param {string} key
     * @param {string} value
     */
    this._setMetadataPair = function (key, value) {
      metadata.parsed[key] = value;
    };

    /**
     * Private: set metadata format
     * @param {string} format
     */
    this._setMetadataFormat = function (format) {
      metadata.format = format;
    };

    /**
     * Private: set metadata raw text
     * @param {string} raw
     */
    this._setMetadataRaw = function (raw) {
      metadata.raw = raw;
    };
  };

  var root = this;

  // AMD Loader
  if (typeof define === 'function' && define.amd) {
    define(function () {
      'use strict';
      return showdown;
    });

    // CommonJS/nodeJS Loader
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = showdown;

    // Regular Browser loader
  } else {
    root.showdown = showdown;
  }
}).call(this);

    //# sourceMappingURL=showdown.js.map
