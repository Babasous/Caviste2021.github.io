window.onload = function(){
    // Effet sur un élément de la liste
    const list = document.querySelectorAll('#list > ul > li');
    for(let i=0; i<list.length; i++){
        list[i].addEventListener('mouseover', function(){
            list[i].style.backgroundColor = 'green';
            list[i].style.color = 'white';
        });
    }

    for(let i=0; i<list.length; i++){
        list[i].addEventListener('mouseout', function(){
            list[i].style.backgroundColor = 'white';
            list[i].style.color = 'black';
        });
    }

    // Affichage des données à partir de l'API
    const apiURL = 'http://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines';
    const pictureURL ='file:///C:/Users/BelAgencyWeb/Desktop/Caviste/images/pics/';
    let vins;
    const xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(this.status === 200){
            let data = this.responseText;
            data = JSON.parse(data);
            // Affichage des éléments de la liste
                for(let j=1; j<13; j++){
                    list[j-1].innerHTML = data[j].name;
                }
            
            let imgAffiche = document.querySelector('#photo > img');
            let allDescription = document.querySelectorAll('#description > i > span');
            const idDescription = document.querySelector('#description > span');
            const nameDescription = document.querySelector('#description > label > h3 > i');
            
            // Affichage de l'image du vin séléctionné
            for(let i=1; i<13; i++){
                list[i-1].addEventListener('click', function(){
                    imgAffiche.src = pictureURL + data[i].picture; 
                    // Affichage de descriptions
                    allDescription[0].innerHTML = data[i].grapes;
                    allDescription[1].innerHTML = data[i].country;
                    allDescription[2].innerHTML = data[i].region;
                    allDescription[3].innerHTML = data[i].year;
                    allDescription[4].innerHTML = data[i].capacity;
                    allDescription[5].innerHTML = data[i].color;
                    allDescription[6].innerHTML = data[i].price;
                    idDescription.innerHTML = '#' + data[i].id;
                    nameDescription.innerHTML = data[i].name;
                });
            }
            // Fonction Search()
            function search(){                
                const inputSearch = document.querySelector('#inputKey');
                let keyword = inputSearch.value;
                let reg = new RegExp(keyword, 'i');
                // console.log(keyword.length);
                let tabVins = [];
                Object.values(data).forEach(function(vin){
                    if(vin.name.search(reg) != -1){
                        tabVins.push(vin);
                    }
                    else if((keyword.length <= 2) && (vin.id.search(reg) != -1)){
                        tabVins.push(vin);            
                    }
                    else if((keyword.length == 4) && (vin.year.search(reg) != -1)){
                        tabVins.push(vin);
                    }        
                })
                // console.log(tabVins);
                // console.log(tabVins[0].id);
                // console.log(tabVins[0].name);
                // console.log(tabVins[0].grapes);
                // console.log(tabVins[0].country);
                // console.log(tabVins[0].region);
                // console.log(tabVins[0].year);
                // console.log(tabVins[0].capacity);
                // console.log(tabVins[0].color);
                // console.log(tabVins[0].price);
                // console.log(tabVins[0].picture);
                for(let i=1; i<13; i++){
                    imgAffiche.src = pictureURL + tabVins[0].picture; 
                    // Affichage de descriptions
                    allDescription[0].innerHTML = tabVins[0].grapes;
                    allDescription[1].innerHTML = tabVins[0].country;
                    allDescription[2].innerHTML = tabVins[0].region;
                    allDescription[3].innerHTML = data[i].year;
                    allDescription[4].innerHTML = tabVins[0].capacity;
                    allDescription[5].innerHTML = tabVins[0].color;
                    allDescription[6].innerHTML = tabVins[0].price;
                    idDescription.innerHTML = '#' + tabVins[0].id;
                    nameDescription.innerHTML = tabVins[0].name;                                  
                    list[i-1].innerHTML = '';
                }                                                    
                list[0].innerHTML = tabVins[0].name; 
            }    
            // Recherche d'un vin par son nameDescription            
            const btSearch = document.querySelector('#btSearch > i');
            btSearch.addEventListener('click', search);            
        }else{
            console.log('ko');
        }   
    };    
    xhr.open('GET', apiURL, true);
    xhr.send();   
}