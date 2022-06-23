const main = () => {
    const htmlDocumentString = "<html><head><title>Gulliver Traveller - Roteiros</title></head><body><b>->1 - Roteiros para *São Paulo*</b><br>A Terra da Garoa!<br>Fundada em 25 de janeiro de 1554 a cidade tem hoje cerca de 12 milhões de habitantes e é considerada o centro financeiro do Brasil e aqui vão 3 dicas de roteiros obrigatórios para aqueles que passam pela capital paulista<br>#Roteiro A | Região: Avenida Paulista<br>MASP; Parque Trianon; Rua Augusta<br>#Roteiro B | Região: Centro<br>Catedral da Sé; Pátio do Colégio; Rua Augusta<br>#Roteiro C | Região: Vila Madalena<br>Beco do Batman; Feirinha da Benedito Calixto; Livraria da Vila<br> <b>->2 - Roteiros para *Las Vegas*</b><br>Viva Las Vegas!<br>       A cidade mais populosa e mais densamente povoada do estado de Nevada, Las Vegas foi fundada em 1905 e é considerada uma cidade, oficialmente, desde 1911 e conta com mais de meio milhão de habitantes. Venha conhecer a capital dos jogos de azar!<br>#Roteiro A | Região: Las Vegas Boulevard South<br>Fonte do Bellagio; Principais Cassinos; Madame Tussauds<br>#Roteiro B | Região: Downtown<br>; Fremont; Las Vegas Art Museum; Museu nacional do Crime Organizado; <br>#Roteiro C | Região: Las Vegas Boulevard North<br>Outlet Premium North; Stratosphere; Apple Fashion Show<br><b>->3 - Roteiros para *Moscou*</b><br>Privet!<br>A capital Russa fica situada às margens do Rio Moscou e apesar de ser a cidade mais cosmopolita da Rússia, conta com grande resguardo de sua história soviética<br>#Roteiro A | Região: Praça Vermelha<br>Museu Histórico do Estado; Catedral de São Basílico; Mausoléu de Lênin<br>#Roteiro B | Região: Centro<br>Teatro Bolshoi; Monumento a Karl Marx; Rio Moscou<br>#Roteiro C | Região: Obras pela cidade<br>Metrô de Moscou; As Sete Irmãs; Moscow Leningradsky Railway Station  <br></body></html>"
    let insideBodyString = htmlDocumentString.match(/<body>(.*?)<\/body>/g);
    insideBodyString = insideBodyString[0].replace("<body>", "").replace("</body>", "");

    const textBetweenBR = insideBodyString.split("<br>");

    const spInfo = textBetweenBR.slice(0, 9);
    const laInfo = textBetweenBR.slice(9, 18);
    const moInfo = textBetweenBR.slice(18, 27);

    const citiesRegex = /\*(.*?)\*/g;
    const cities = []

    cities.push(spInfo[0].match(citiesRegex)[0].replaceAll("*", ""));
    cities.push(laInfo[0].match(citiesRegex)[0].replaceAll("*", ""));
    cities.push(moInfo[0].match(citiesRegex)[0].replaceAll("*", ""));

    const generalInfo = {};

    generalInfo.sp = {
        aRoadMap: spInfo[4].split('; ')
    }
    generalInfo.la = {
        aRoadMap: laInfo[4].split('; ')
    }
    generalInfo.mo = {
        aRoadMap: moInfo[4].split('; ')
    }

    generalInfo.sp.aRoadMap.unshift(spInfo[3].split('| ')[1])
    generalInfo.la.aRoadMap.unshift(laInfo[3].split('| ')[1])
    generalInfo.mo.aRoadMap.unshift(moInfo[3].split('| ')[1])

    generalInfo.sp.center = spInfo[6].split('; ')
    generalInfo.la.downtown = laInfo[6].split('; ')
    generalInfo.la.downtown.shift();
    generalInfo.la.downtown.pop();

    generalInfo.cities = cities

    return generalInfo;
}

document.addEventListener("DOMContentLoaded", function () {
    const generalInfo = main();
    console.log(generalInfo)

    const cities = document.querySelector('.evaluated-cities');
    generalInfo.cities.map((city) => {
        const cityDiv = document.createElement('div');
        cityDiv.innerText = city
        cities.appendChild(cityDiv)
    });

    const roadMapSp = document.querySelector('.road-map-sp');
    const roadMapLa = document.querySelector('.road-map-la');
    const roadMapMo = document.querySelector('.road-map-mo');

    generalInfo.sp.aRoadMap.map((item) => {
        roadMapSp.appendChild(document.createTextNode(item))
        roadMapSp.appendChild(document.createElement('br'))
    })
    roadMapSp.appendChild(document.createTextNode(`Total de ${generalInfo.sp.aRoadMap.length - 1} locais citados`))

    generalInfo.la.aRoadMap.map((item) => {
        roadMapLa.appendChild(document.createTextNode(item))
        roadMapLa.appendChild(document.createElement('br'))
    })
    roadMapLa.appendChild(document.createTextNode(`Total de ${generalInfo.la.aRoadMap.length - 1} locais citados`))

    generalInfo.mo.aRoadMap.map((item) => {
        roadMapMo.appendChild(document.createTextNode(item))
        roadMapMo.appendChild(document.createElement('br'))
    })
    roadMapMo.appendChild(document.createTextNode(`Total de ${generalInfo.mo.aRoadMap.length - 1} locais citados`))

    const spCenterAttra = document.querySelector('.sp-center-attractions');
    const laDowntownAttra = document.querySelector('.la-downtown-attractions');

    generalInfo.sp.center.map((item) => {
        spCenterAttra.appendChild(document.createTextNode(item))
        spCenterAttra.appendChild(document.createElement('br'))
    })

    generalInfo.la.downtown.map((item) => {
        laDowntownAttra.appendChild(document.createTextNode(item))
        laDowntownAttra.appendChild(document.createElement('br'))
    })
});