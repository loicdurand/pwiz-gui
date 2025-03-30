pub mod service {

    use polodb_core::{bson::doc, Collection, CollectionT, Database};
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

    // pub fn insert_tuto(data: Data) -> i32 {
    //     let db: Database = establish_connection();
    //     let posts: Collection<Post> = db.collection("posts");

    //     let tags = data.tags.split(' ').collect::<Vec<&str>>();
    //     let mut content:Vec<String> = Vec::new();
    //     for line in data.content.lines() {
    //         content.push(line.trim().to_string());
    //     }

    //     let recap = model::model::Recap {
    //         author: username(),
    //         title: data.title.clone(),
    //         content_type: "commande".to_string(),
    //         content,
    //         tags: tags.iter().map(|s| s.to_string()).collect(),
    //     };

    //     if let Ok(_) = posts.insert_one(doc! {
    //         "author": username(),
    //         "title": data.title.clone(),
    //         "content": content,
    //         "content_type": "commande".to_string(),
    //         "tags": tags.iter().map(|s| s.to_string()).collect(),
    //     }).unwrap();
    //     0
    // }
}
