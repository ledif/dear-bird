library(tidytext)
library(ggplot2)
library(jsonlite)

data("stop_words")

loadFiles <- function() {
  files <- list.files("../scrape/data/json/")
  text <- sapply(files, function(file) { fromJSON(paste("../scrape/data/json/",file,sep=""))$Transcript })
  text_df <- data_frame(line = 1:83, text = text)
  return(text_df)
}


text_df <- loadFiles()

counts <- text_df %>%
  unnest_tokens(word, text) %>%
  anti_join(stop_words) %>%
  count(word, sort = T)  %>%
  filter(n > 40) %>%
  mutate(word = reorder(word, n))

ggplot(counts, aes(word, n)) +
  geom_bar(stat = "identity") +
  xlab(NULL) +
  coord_flip()
