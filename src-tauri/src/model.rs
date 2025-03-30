pub mod model {

    use serde::{Deserialize, Serialize};
    //   use whoami::username;

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Post {
        pub id: i32,
        pub author: String,
        pub title: String,
        pub content: String,
        pub content_type: String,
        pub tags: Vec<String>,
    }

}
