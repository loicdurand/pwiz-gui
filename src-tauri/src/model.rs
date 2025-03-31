pub mod model {
    use serde::{ Deserialize, Serialize };
    use whoami::username;

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Post {
        // pub id: i32,
        pub author: String,
        pub title: String,
        pub content: Vec<String>,
        pub content_type: String,
        pub tags: Vec<String>,
    }

    impl Post {
        pub fn default(title: &str, content_type: &str, content: &str, tags: &str) -> Self {
            let tags = tags.split(' ').collect::<Vec<&str>>();
            let mut lines: Vec<String> = Vec::new();
            for line in content.lines() {
                lines.push(line.trim().to_string());
            }

            Self {
                author: username(),
                title: title.to_string(),
                content: lines,
                content_type: content_type.to_string(),
                tags: tags
                    .iter()
                    .map(|s| s.to_string())
                    .collect(),
            }
        }
    }
}
