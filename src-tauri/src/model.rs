pub mod model {
    use serde::{Deserialize, Serialize};
    use unique_id::string::StringGenerator;
    use unique_id::Generator;
    use whoami::username;

    fn get_id() -> String {
        let gen = StringGenerator::default();
        let mut last = gen.next_id();
        for _ in 1..100_000 {
            let next = gen.next_id();
            assert_ne!(last, next);
            last = next;
        }
        last
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Post {
        pub id: String,
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
                id: get_id(),
                author: username(),
                title: title.to_string(),
                content: lines,
                content_type: content_type.to_string(),
                tags: tags.iter().map(|s| s.to_string()).collect(),
            }
        }
    }
}
