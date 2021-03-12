__**Comment fonctionnent les transitions en D3 et en svelte?**__
**D3**
On crée un container pour la cellule SVG, on donne la forme, et on défini la transition (.transition()) avec, comme par exemple, sa durée et ses différents attributs (de taille, de radiant, couleurs etc...). On peut définir plusieurs transitions différentes. D3 n'est pas une librairie idéale pour faire des transitions.  

**Svelte**
On met un valeur réactive qui est une key. Pour chaque donnée, on passe un composant {#each}