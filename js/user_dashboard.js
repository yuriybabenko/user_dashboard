(function ($) {
  /**
   * Implementation of Drupal.behaviors for user_dashboard;
   */
  Drupal.behaviors.user_dashboard = {
    attachEvents: function () {
      $('#user-dashboard-set-default').click(function (e) {
        e.preventDefault();
        
        console.log('clicked');
      });
    }
  };
  
  /**
   * Override the default setupDrawer function to add our new link/button
   */
  Drupal.behaviors.dashboard.setupDrawer = function () {
    $('div.customize .canvas-content input').click(Drupal.behaviors.dashboard.exitCustomizeMode);
    $('div.customize .canvas-content').append('<a class="button" href="' + Drupal.settings.dashboard.dashboard + '">' + Drupal.t('Done') + '</a>');
    
    if(Drupal.settings.user_dashboard.set_default_blocks_access) {  
      $('div.customize .canvas-content').append('<a class="button" id="user-dashboard-set-default" href="' + Drupal.settings.user_dashboard.default_blocks_callback + '">' + Drupal.t('Set blocks as default') + '</a>');
      Drupal.behaviors.user_dashboard.attachEvents();
    }
    
    // Initialize drag-and-drop.
    var regions = $('#dashboard div.region');
    regions.sortable({
      connectWith: regions,
      cursor: 'move',
      cursorAt: {top:0},
      dropOnEmpty: true,
      items: '> div.block, > div.disabled-block',
      placeholder: 'block-placeholder clearfix',
      tolerance: 'pointer',
      start: Drupal.behaviors.dashboard.start,
      over: Drupal.behaviors.dashboard.over,
      sort: Drupal.behaviors.dashboard.sort,
      update: Drupal.behaviors.dashboard.update
    });
  }
})(jQuery);
