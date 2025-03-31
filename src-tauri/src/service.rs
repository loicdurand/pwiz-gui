pub mod service {
    use polodb_core::{ bson::doc, Collection, CollectionT, Database };
    // use whoami::username;
    //   use std::process;

    use crate::model::model::Post;

    pub fn establish_connection() -> Database {
        let db_path = String::from("./pwiz.db"); // chemin de la BDD
        let db = Database::open_path(&db_path).unwrap();
        db
    }

    pub fn get_posts() -> Vec<Post> {
        let db: Database = establish_connection();
        let posts: Collection<Post> = db.collection("posts");
        let mut resultats: Vec<Post> = Vec::new(); // Vec qui contiendra nos résultats de recherche
        let posts_result = posts.find(doc! {}).run();
        if let Ok(posts) = posts_result {
            for post in posts {
                if let Ok(post) = post {
                    resultats.push(post);
                }
            }
        }
        resultats
    }

    pub fn insert_post(title: &str, content_type: &str, content: &str, tags: &str) -> i32 {
        let db: Database = establish_connection();
        let posts: Collection<Post> = db.collection("posts");

        posts.insert_one(Post::default(title, content_type, content, tags)).unwrap();
        1
    }
}
