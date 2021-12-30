use reqwest::Result;
use std::time::Duration;
use reqwest::ClientBuilder;

fn main() {
    println!("Welcome to testing Rust from 0 course!");
    testapi();
}



async fn testapi() -> Result<()> {
    let emisor = "7884";
    let request_url = format!("https://hkpy.irstrat.com/intradia/{}", emisor);
    println!("{}", request_url);

    let timeout = Duration::new(5, 0);
    let client = ClientBuilder::new().timeout(timeout).build()?;
    let response = client.head(&request_url).send().await?;

    if response.status().is_success() {
        println!("{} is a emiter!", emisor);
    } else {
        println!("{} is not a emiter!", emisor);
    }

    Ok(())
}