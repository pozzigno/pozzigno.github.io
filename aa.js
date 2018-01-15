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
			
			console.log("Parto con: " + nome + "," + cogn + "," + pos + "," + point);
			
			$("input:hidden[zname='HH_cogn'][value^='" + cogn + "']").each(function(){
				var cod = $(this).parent().find("input:hidden[zname='HH_cod']").val();
				var name = $(this).parent().find("input:hidden[zname='HH_nome']").val();
				if(name == nome) {
					//console.log("Trovo ESATTO: " + $(this).val() + " - " + name + cod);
					var dd = $(this).parent().find("select.HH_point_" + cod + " option[value=" + point + "]").attr("selected",true);
					return;
				} else {
					var dd = $(this).parent().find("select.HH_point_" + cod + " option:selected");
                                        console.log("Trovo: " + $(this).val() + " - " + name + cod);
					// se diverso da 0, non faccio nulla
					if(dd != null && dd.val() == "0") {
						$(this).parent().find("select.HH_point_" + cod + " option[value=" + point + "]").attr("selected",true);
						//console.log("Trovo: " + $(this).val() + " - " + name + cod);
					}
				}
			});
		}
	}
	
	
	// aggiorna dati squadre
	updTotPoints('A');
	updTotPoints('B');
	updTotPoints('C');
	updTotPoints('D');
	updTotPoints('E');
	
	//$("select[name^='atl_'] option:selected").each(function(){console.log($(this).attr("value"));});
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
