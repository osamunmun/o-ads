(function (w, d, $) {
  "use strict";
  var gitAPI = 'http://git.svc.ft.com/rpc',
    gitRepo = 'http://git.svc.ft.com:9080/git/modules/advertising.git',
    advertisingBase = 'http://www.ft.com/m/advertising/',
    versionsTable = $('#versions'),
    versionsTbody = versionsTable.find('tbody'),
    regExp = {
      tags: /^refs\/tags\//,
      gitRev: /gitRev:\s\"([^"]*)\"/,
      buildLifeId: /buildLifeId:\s\"([^"]*)\"/,
      buildLifeDate: /buildLifeDate:\s\"([^"]*)\"/
    };

  function addVersionsToPage(data) {
    var availableRefs = data[gitRepo].availableRefs;
    availableRefs.forEach(function (item) {
      if(regExp.tags.test(item)){
        var version = item.replace(regExp.tags,'');
        $('<tr id="' + version + '"><td>' + version + '</td><td class="js waiting"></td><tr>')
        .appendTo(versionsTbody);
        isVersionAvailable(version);
      }
    });
  }

  function updateVersionAvailability(outcome, version) {
    console.log(outcome, version);
    var outcomeText = outcome === 'success' ? '✔' : '✘';
    $(document.getElementById(version)).find('td.waiting')
      .removeClass('waiting')
      .addClass(outcome)
      .text(outcomeText);
  }

  function isVersionAvailable(version) {
    $.get(advertisingBase + version + '.js')
      .always(function (response) {
        if(response.status === 200) {
          updateVersionAvailability('success', version);
        } else {
          updateVersionAvailability('fail', version);
        }
      });
  }

  function init(){
    //get repo information from gitblit so we can see what versions exist
    $.getJSON(gitAPI + '?req=LIST_REPOSITORIES')
      .done(addVersionsToPage);
  }

  $(init);
})(window, document, jQuery);
