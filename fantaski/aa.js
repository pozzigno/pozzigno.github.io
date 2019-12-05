function fantaskiForm(form) {
	form.action='updater';
	
	var msg = "";
	for(var i=0; i<_TEAMS.length; i++) {
		var dd = document.getElementById(_TEAMS[i].cod);
		var cc = $(dd).find("select[name^='atl_'] option[value!=0]:selected");
		if(cc.length > 4)
			msg += _TEAMS[i].name + ' => ' + cc.length + '\n';
	}
	
	if(msg.length > 0)
		alert("Attenzione! Le seguenti squadre hanno più di 4 preferenze:\n" + msg);
	else {
		form.submit();
	}
}
function updateChoose(check,cod,disc) {
    xmlhttp = new XMLHttpRequest();
    var uu = "updaterChoose" + "?" + "cod="+cod + "&discID=" + disc + "&choose=" + check.checked;
    xmlhttp.open("GET",uu,true);
    xmlhttp.send();
}
function telecomandoForm(url,go) {
    url = url + "?" + "pag=" + go;
    location.replace(url);
}
function tokenizzalo(id) {
	
	var tutti = new Array();
	var nntrovati = new Array();
	var nntrovatiSTR = "";
	var found = false;
	//$("select[name^='atl_'] option").removeAttr("selected");
	//$("select[name^='atl_'] option").removeProp("selected");
	$("select[name^='atl_'] option[value=0]").attr("selected",true);
	
    var dd = document.getElementById(id);
	if(dd != null && dd.value != null) {
		var dds = dd.value.split("\n");
		for(var i=0; i<dds.length; i++) {
			var ddss = dds[i].split("\t")
			var pos = ddss[0];
			var nome = replaceSborona(ddss[1]);
			var cogn = replaceSborona(ddss[2]);
			var point = 0;
			for(var w=0; w<_POINTS.length; w++) {
				if(_POINTS[w].pos == pos) {
					point = _POINTS[w].point;
					break;
				}
			}
			
			if(cogn != null && cogn.length > 0) {
			
				found = false;
				
				//console.log("Parto con: " + nome + "," + cogn + "," + pos + "," + point);
				
				var jj = {nome: nome, cognome: cogn, punti: point, pos: pos};
				tutti.push(jj);
				
				var cc = $("input:hidden[zname='HH_cogn'][value^='" + cogn + "']");
				if(cc != null) {
					if(cc.length > 1) {
						// se trovo più cognomi, cerco per nome
						cc.each(function(){
							found = true;
							var cod = $(this).parent().find("input:hidden[zname='HH_cod']").val();
							var name = $(this).parent().find("input:hidden[zname='HH_nome']").val();
							if(name == nome) {
								$(this).parent().find("select.HH_point_" + cod + " option[value=0]").attr("selected",false);
								$(this).parent().find("select.HH_point_" + cod + " option[value=" + point + "]").attr("selected",true);
							}
						});
					} else {
						// cerco solo per cognome
						cc.each(function() {
							found = true;
							var cod = $(this).parent().find("input:hidden[zname='HH_cod']").val();
							var name = $(this).parent().find("input:hidden[zname='HH_nome']").val();
							var dd = $(this).parent().find("select.HH_point_" + cod + " option:selected");
							// se diverso da 0, non faccio nulla
							if(dd != null && dd.val() == "0") {
								$(this).parent().find("select.HH_point_" + cod + " option[value=0]").attr("selected",false);
								$(this).parent().find("select.HH_point_" + cod + " option[value=" + point + "]").attr("selected",true);
							}
						});
					}
				}
				if(!found) {
					nntrovatiSTR += pos + ') ' + cogn + ' ' + nome + "\n";
					nntrovati.push(jj);
				}
			}
		}
	}
	
	
	// aggiorna dati squadre
	updTotPoints('A');
	updTotPoints('B');
	updTotPoints('C');
	updTotPoints('D');
	updTotPoints('E');
	
	console.log(tutti);
	console.log(nntrovati);
	$('#' + id + '_not').val(nntrovatiSTR);
}
function replaceSborona(s) {
	if(s == null) return null;
	s = s.replace(new RegExp("ö","g"),"oe");
	s = s.replace(new RegExp("ø","g"),"oe");
	s = s.replace(new RegExp("à","g"),"a");
	s = s.replace(new RegExp("á","g"),"a");
	s = s.replace(new RegExp("è","g"),"e");
	s = s.replace(new RegExp("é","g"),"e");
	s = s.replace(new RegExp("ì","g"),"i");
	s = s.replace(new RegExp("ò","g"),"o");
	s = s.replace(new RegExp("ù","g"),"u");
	return s;
}
