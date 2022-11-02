library(tidyr);
library(dplyr);
library(ggplot2);
library(jsonlite);

# To work on my partitioned hard drive, i need to specify where the working directory is
setwd("D:/GitHub/Baumkataster-Explorer/dataset");

# using jdonlite and tidyverse to parse json into tibble
raw_json <- fromJSON("gsz.baumkataster_baumstandorte.json")
raw_tibble <- as_tibble(raw_json$features) %>% unnest(properties)

# str(raw_tibble);

tidy_data <- raw_tibble %>%
    mutate(poi_id,
    status = as.factor(status),
    baumtyp = as.factor(baumtyp),
    quartier = as.factor(quartier),
    pflanzjahr = as.Date(ISOdate(pflanzjahr,1,1)),
    baumgattunglat = as.factor(baumgattunglat),
    baumartlat = as.factor(baumartlat),
    kategorie,
    )

# examine structure
str(tidy_data);

# how many trees are there of each species? max - 4747
tidy_data %>%
group_by(baumgattunglat, baumartlat)%>%
summarize(count= n())%>%
arrange(desc(count))