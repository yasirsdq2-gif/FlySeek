const names = ["King Khalid International Airport", "London Heathrow Airport", "John F. Kennedy International Airport", "Multan International Airport", "Los Angeles International Airport"];
names.forEach(n => console.log(n, "->", n.replace(/\s*(International|Regional|Municipal|City|County)?\s*(Airport|Airfield|Heliport).*/i, '')));
