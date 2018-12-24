(function() {
  // constants
  var validPostcodes =
      /^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$/;

  // HTML elements
  var $body = $(document.body),
      $form = $('#postcode-form'),
      $field = $('#postcode').val(''),
      $result = $('#result'),
      $constituency = $('#constituency'),
      $location = $('#location'),
      $votes = $('#votes'),
      $comparison = $('#comparison');

  var currentPostcode = '';

  function resetPlaceholder(focus) {
    $field.attr('placeholder', 'Enter your postcode.');

    if (focus) {
      $field.focus();
    }
  }

  function renderer(data) {
    var votes = Math.round(data.votes * 100),
        percentage = votes - 100;

    $body.removeClass('surplus');
    $body.removeClass('defecit');

    $constituency.html(data.name);
    $location.html(data.location);
    $votes.html(Math.round(votes) / 100);

    if (percentage > 0) {
      $comparison.html(percentage + '% more than');
      $body.addClass('surplus');
    } else if (percentage < 0) {
      $comparison.html((-percentage) + '% less than');
      $body.addClass('defecit');
    } else {
      $comparison.html('the same as');
    }

    $result.fadeIn(1000);
    resetPlaceholder(false);
  }

  function handler() {
    var postcode = $field.val().toUpperCase();

    if (postcode !== currentPostcode && validPostcodes.test(postcode)) {
      currentPostcode = postcode;

      $field.blur();

      $result.fadeOut(1000, function() {
        $.getJSON('/api/' + postcode, renderer);
      });
    }
  }

  $field.on('keyup', handler);
  $field.on('change', handler);
  $form.on('submit', function(e) {
    e.preventDefault();
    handler();
  });

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      $.getJSON('/api/' + pos.coords.latitude + '/' + pos.coords.longitude, renderer);
    }, function() {
      resetPlaceholder(true);
    });
  } else {
    resetPlaceholder(true);
  }
})();
