namespace MissingPaws.Models
{
    public class LostPet
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime MissingDate { get; set; }
        public string LastSeenLocation { get; set; } = string.Empty;
        public string ContactInfo { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
    }
}
